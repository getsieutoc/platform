'use server';

import { EnvironmentVariables, Project } from '@/types';
import { generatePassword } from '@/lib/generators';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export type CreateProjectDto = Pick<Project, 'name' | 'description' | 'slug'>;

export const createProject = async (input: CreateProjectDto) => {
  const { session } = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  try {
    const environmentVariables: EnvironmentVariables = {
      production: {
        NEXTAUTH_SECRET: generatePassword(),
        POSTGRES_PASSWORD: generatePassword({ hasSpecial: false }),
      },
      preview: {
        NEXTAUTH_SECRET: generatePassword(),
        POSTGRES_PASSWORD: generatePassword({ hasSpecial: false }),
      },
    };

    const response = await prisma.project.create({
      data: {
        ...input,
        environmentVariables,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('This subdomain is already taken', { cause: error });
    }

    throw error;
  }
};

export type UpdateProjectDto = Partial<Project>;

export const updateProject = async (id: string, data: UpdateProjectDto) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const { name, description, slug, customDomain, template } = data;

  const Project = await prisma.project.findUnique({
    where: { id },
  });

  if (!Project || Project.userId !== session.user.id) {
    throw new Error('You do not have permission to update this Project');
  }

  const response = await prisma.project.update({
    where: { id: id },
    data: {
      name,
      description,
      slug,
      customDomain: customDomain === '' ? null : customDomain,
      template,
    },
  });

  return response;
};

export const deleteProject = async (project: Project) => {
  try {
    const { session } = await getSession();
    if (!session?.user.id) {
      return {
        error: 'Not authenticated',
      };
    }

    const response = await prisma.project.delete({
      where: {
        id: project.id,
      },
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const editUser = async (formData: FormData, _id: unknown, key: string) => {
  const { session } = await getSession();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
