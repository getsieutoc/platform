'use server';

import deepmerge from 'deepmerge';

import {
  DomainConfigResponse,
  DomainResponse,
  DomainVerificationResponse,
  EnvironmentVariables,
  HttpMethod,
  Project,
  ProjectResponse,
  Site,
} from '@/types';

import { TEAM_ID, VERCEL_TOKEN, VERCEL_API_URL } from '../constants';
import { fetcher } from '../utils';

import { checkRepoExisting } from './github';

const defaultOptions = {
  framework: 'nextjs',
  gitRepository: {
    type: 'github',
  },
};

export const addDomainToProject = async (projectId: string, domain: string) => {
  const response = await fetcher(
    `${VERCEL_API_URL}/v10/projects/${projectId}/domains?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.POST,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      body: JSON.stringify({
        name: domain,
      }),
    }
  );

  return response;
};

export const removeDomainFromProject = async (projectId: string, domain: string) => {
  const response = await fetcher(
    `${VERCEL_API_URL}/v10/projects/${projectId}/domains/${domain}?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.DELETE,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );

  return response;
};

export const getDomainResponse = async (projectId: string, domain: string) => {
  const response = await fetcher<DomainResponse>(
    `${VERCEL_API_URL}/v9/projects/${projectId}/domains/${domain}?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.GET,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );

  return response;
};

export const getConfigResponse = async (domain: string) => {
  const response = await fetcher<DomainConfigResponse>(
    `${VERCEL_API_URL}/v6/domains/${domain}/config?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.GET,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  return response;
};

export const isSubdomainFree = async (domain: string) => {
  if (domain.length <= 3) {
    throw new Error('Domain is required');
  }

  const response = await fetch(`https://${domain}.sieutoc.website`, {
    method: HttpMethod.GET,
  });

  if (response.status === 200 || response.statusText === 'OK') {
    return false;
  }

  if (response.status === 404 || response.statusText === 'Not Found') {
    return true;
  }

  throw new Error(response.statusText);
};

export const verifyDomain = async (projectId: string, domain: string) => {
  const response = await fetcher<DomainVerificationResponse>(
    `${VERCEL_API_URL}/v9/projects/${projectId}/domains/${domain}/verify?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  );

  return response;
};

export type CreateProjectDto = Site;

export const createProject = async ({
  id,
  environmentVariables,
  subdomain,
}: CreateProjectDto) => {
  const gitRepo = `sieutoc-customers/${id}`;

  const envs = environmentVariables as EnvironmentVariables;

  const data = deepmerge(defaultOptions, {
    name: id,
    gitRepository: { repo: gitRepo, type: 'github' },
    environmentVariables: [
      ...[
        {
          key: 'NEXTAUTH_SECRET',
          value: envs.production.NEXTAUTH_SECRET,
        },
        {
          key: 'ARGON_SECRET',
          value: envs.production.ARGON_SECRET,
        },
        {
          key: 'SITE_ID',
          value: id,
        },
      ].map((o) => ({ ...o, target: 'production', type: 'encrypted' })),
      ...[
        {
          key: 'NEXTAUTH_SECRET',
          value: envs.preview.NEXTAUTH_SECRET,
        },
        {
          key: 'ARGON_SECRET',
          value: envs.preview.ARGON_SECRET,
        },
        {
          key: 'SITE_ID',
          value: id,
        },
      ].map((o) => ({ ...o, target: 'preview', type: 'encrypted' })),
    ],
  });

  const response = await fetcher<Project>(
    `${VERCEL_API_URL}/v9/projects?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.POST,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      body: JSON.stringify(data),
    }
  );

  // Update the subdomain, we can not do it with project creation
  if (response && response.id) {
    await addDomainToProject(response.id, `${subdomain}.sieutoc.website`);

    // Because the default branch is fucking `main` so we have to make another update request
    await fetcher<Project>(
      `https://vercel.com/api/v4/projects/${response.id}/branch?teamId=${TEAM_ID}`,
      {
        method: HttpMethod.PATCH,
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
        body: JSON.stringify({ branch: 'master' }),
      }
    );
  }

  return response;
};

export const findProject = async (idOrName?: string | null) => {
  if (!idOrName) return null;

  const response = await fetcher<ProjectResponse>(
    `${VERCEL_API_URL}/v9/projects/${idOrName}?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.GET,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );

  if ('error' in response && response.error?.code === 'not_found') {
    return null;
  }

  return response;
};

export const deleteProject = async (idOrName: string) => {
  const found = await findProject(idOrName);

  if (!found) {
    return;
  }

  const response = await fetcher(
    `${VERCEL_API_URL}/v9/projects/${found.id}?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.DELETE,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );

  return response;
};

export type DeployDto = {
  id: string; // Site UUID (used as name)
};

export const createDeployment = async ({ id }: DeployDto) => {
  const existingRepo = await checkRepoExisting(id);

  if (!existingRepo) {
    return;
  }

  const deployResponse = await fetcher(
    `${VERCEL_API_URL}/v13/deployments/?teamId=${TEAM_ID}`,
    {
      method: HttpMethod.POST,
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      body: JSON.stringify({
        name: id,
        gitSource: {
          repoId: existingRepo.id,
          type: 'github',
          ref: 'master',
        },
        projectSettings: {
          framework: 'nextjs',
        },
      }),
    }
  );

  return deployResponse;
};
