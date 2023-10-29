'use server';

import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Site } from '@/types';

export type CreateSiteDto = {
  name: string;
  description: string;
  subdomain: string;
};

export const createSite = async ({ name, description, subdomain }: CreateSiteDto) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  try {
    const environmentVariables = {
      production: {
        NEXTAUTH_SECRET: crypto.randomBytes(32).toString('hex'),
        ARGON_SECRET: crypto.randomBytes(32).toString('hex'),
      },
      preview: {
        NEXTAUTH_SECRET: crypto.randomBytes(32).toString('hex'),
        ARGON_SECRET: crypto.randomBytes(32).toString('hex'),
      },
    };

    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        environmentVariables,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidateTag(`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('This subdomain is already taken', { cause: error });
    }

    throw error;
  }
};

export type UpdateSiteDto = Partial<Site>;

export const updateSiteSimple = async (
  siteId: string,
  { name, description, subdomain, customDomain }: UpdateSiteDto
) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const site = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
  });

  if (!site || site.userId !== session.user.id) {
    throw new Error('You do not have permission to update this site');
  }

  const response = await prisma.site.update({
    where: { id: siteId },
    data: {
      name,
      description,
      subdomain,
      customDomain: customDomain === '' ? null : customDomain,
    },
  });

  // TODO: WHY?
  if (subdomain) {
    revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
  }

  return response;
};

export const deleteSite = async (site: Site) => {
  try {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: 'Not authenticated',
      };
    }

    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });
    revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    response.customDomain && revalidateTag(`${site.customDomain}-metadata`);
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const editUser = async (formData: FormData, _id: unknown, key: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: 'Not authenticated',
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
