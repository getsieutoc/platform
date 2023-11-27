'use server';

import { Client as EasyPanelClient, ProjectName, ProjectQueryConf } from 'easypanel.js';
import { getSession } from '@/lib/auth';

const easypanel = new EasyPanelClient({
  endpoint: process.env.EASYPANEL_URL ?? '',
  token: process.env.EASYPANEL_API_KEY ?? '',
  credentials: { email: '', password: '' }, // to silent the TypeScript error
});

export const createProject = async ({ name }: ProjectName) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.create({ name });

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

export const deleteProject = async ({ name }: ProjectName) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.destory({ name });
  console.log('### delete response: ', { response });

  return response;
};
