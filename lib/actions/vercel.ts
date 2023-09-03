'use server';

import { HttpMethod, type JsonObject, type Site } from '@/types';
import deepmerge from 'deepmerge';

import { TEAM_ID, VERCEL_TOKEN, VERCEL_API_URL } from '../constants';
import { fetcher } from '../utils';

const defaultOptions = {
  framework: 'nextjs',
  gitRepository: {
    type: 'github',
  },
};

export type CreateProjectDto = Site;

export const createProject = async ({ id, environmentVariables }: CreateProjectDto) => {
  try {
    const gitRepo = `sieutoc-customers/${id}`;

    const envs = environmentVariables as JsonObject;

    const data = deepmerge(defaultOptions, {
      name: id,
      gitRepository: { repo: gitRepo },
      environmentVariables: [
        {
          key: 'NEXTAUTH_SECRET',
          value: envs.NEXTAUTH_SECRET,
        },
        {
          key: 'ARGON_SECRET',
          value: envs.ARGON_SECRET,
        },
      ].map((o) => ({ ...o, target: 'production', type: 'encrypted' })),
    });

    const response = await fetcher(`${VERCEL_API_URL}/projects?teamId=${TEAM_ID}`, {
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error: any) {
    console.error(error);
  }
};
