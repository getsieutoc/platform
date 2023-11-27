'use server';

import {
  easypanel as easypanelClient,
  ProjectName,
  ProjectQueryConf,
  CreateService,
  ServiceType,
} from 'easypanel-sdk';
import { getSession } from '@/lib/auth';
import { delayAsync } from '@/lib/utils';
import { EnvironmentVariables, Site } from '@/types';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var easypanel: ReturnType<typeof easypanelClient> | undefined; // declare needs var
}

const easypanel =
  global.easypanel ??
  easypanelClient({
    endpoint: process.env.EASYPANEL_URL ?? '',
    token: process.env.EASYPANEL_API_KEY ?? '',
  });

if (process.env.NODE_ENV === 'development') {
  global.easypanel = easypanel;
}

export const createProject = async (site: Site) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      throw new Error('Unauthorized');
    }

    const { production } = site.environmentVariables as EnvironmentVariables;

    const response = await easypanel.projects.create({ name: site.id });

    const databaseUrl = `postgres://postgres:${production.POSTGRES_PASSWORD}@${site.id}_postgres:5432/${site.id}`;

    await delayAsync(500);

    await easypanel.services.create('app', {
      projectName: site.id,
      serviceName: 'nextjs',
      domains: [{ host: '$(EASYPANEL_DOMAIN)' }],
    });

    await delayAsync(500);

    // @ts-expect-error // postgres typo name
    await easypanel.services.create('postgres', {
      projectName: site.id,
      serviceName: 'postgres',
      domains: [{ host: '$(EASYPANEL_DOMAIN)' }],
      image: 'postgres:16',
      password: production.POSTGRES_PASSWORD,
    });

    await delayAsync(500);

    await easypanel.services.updateSourceGithub('app', {
      projectName: site.id,
      serviceName: 'nextjs',
      owner: 'sieutoc-customers',
      repo: site.id,
      ref: 'master',
      path: '/',
    });

    await delayAsync(1000);

    await easypanel.services.updateEnv('app', {
      projectName: site.id,
      serviceName: 'nextjs',
      env: Object.entries({
        ...production,
        NEXTAUTH_URL: '$(PRIMARY_DOMAIN)',
        DATABASE_URL: databaseUrl,
      })
        .map(([k, v]) => `${k}=${v}`)
        .join('\n'),
    });

    await delayAsync(500);

    await easypanel.services.updateBuild('app', {
      projectName: site.id,
      serviceName: 'nextjs',
      build: { type: 'nixpacks' },
    });

    await delayAsync(500);

    // do the deploy later, it takes too long
    // const deployed = await easypanel.services.deploy('app', {
    //   projectName: site.id,
    //   serviceName: 'nextjs',
    // });
    // console.log('### deployed: ', deployed);

    await delayAsync(500);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProject = async ({ projectName }: ProjectQueryConf) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.inspect({ projectName });

  return response;
};

export const deleteProject = async ({ name }: ProjectName) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  const foundProject = await easypanel.projects.inspect({ projectName: name });

  // We have to delete all services inside before deleting the project
  const destroyRequests = foundProject.result.data.json.services.map((service) => {
    return easypanel.services.destroy(service.type, {
      projectName: service.projectName,
      // @ts-expect-error
      serviceName: service.name, // wrong type return in inspect service
    });
  });

  await Promise.all(destroyRequests);

  const response = await easypanel.projects.destory({ name });

  return response;
};

export const createService = async (serviceType: ServiceType, input: CreateService) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.services.create(serviceType, input);

  return response;
};