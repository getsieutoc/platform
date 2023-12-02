'use server';

import {
  easypanel as easypanelClient,
  ProjectName,
  ProjectQueryConf,
  CreateService,
} from 'easypanel-sdk';
import { Project } from '@/types';
import { delayAsync } from '@/lib/utils';
import { getSession } from '@/lib/auth';
import { templates } from '@/templates';

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

export const createEasyPanelProject = async (project: Project) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.create({ name: project.id });

  await delayAsync(500);

  const template = templates.find((t) => t.slug === project.template);

  if (template) {
    const { services } = template.generate({ projectName: project.id });

    const requests = services.map(({ type, data }) => [
      easypanel.services.create(type, data),
      delayAsync(500),
    ]);

    await Promise.all(requests.flat());
  }

  // do the deploy later, it takes too long
  // const deployed = await easypanel.services.deploy('app', {
  //   projectName: project.id,
  //   serviceName: 'nextjs',
  // });

  return response;
};

export const getProject = async ({ projectName }: ProjectQueryConf) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.inspect({ projectName });

  return response;
};

export const deleteEasyPanelProject = async ({ name }: ProjectName) => {
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

export const updateDomains = async (
  input: Pick<CreateService, 'domains'> & Pick<Project, 'id'>
) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.services.updateDomains('app', {
    projectName: input.id,
    serviceName: 'nextjs',
    domains: input.domains,
  });

  return response;
};
