'use server';

import type { RequestParameters, Site } from '@/types';

import { GITHUB_API_VERSION } from '../constants';
import { octokit } from '../octokit';

const defaultOptions: Partial<RequestParameters> = {
  headers: {
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  },
};

export const checkRepoExisting = async (id: string) => {
  try {
    const response = await octokit.request(`GET /repos/sieutoc-customers/${id}`, {
      owner: 'OWNER',
      repo: 'REPO',
      ...defaultOptions,
    });

    return response;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

// type RequestParameters = Parameters<typeof octokit.request>[1];

export type CreateRepoDto = Pick<Site, 'id' | 'description'> & {
  homepage?: string;
  private?: boolean;
} & RequestParameters;

export const createRepo = async (data: CreateRepoDto) => {
  const response = await octokit.request(
    'POST /repos/websitesieutoc/{template_repo}/generate',
    {
      template_repo: 'nextjs-template',
      owner: 'sieutoc-customers',
      name: data.id,
      description: data.description ?? '',
      private: data.private ?? true,
      include_all_branches: false,
      ...defaultOptions,
    }
  );

  return response;
};

export const deleteRepo = async (id: string) => {
  const response = await octokit.request(`DELETE /repos/sieutoc-customers/${id}`, {
    owner: 'OWNER',
    repo: 'REPO',
    ...defaultOptions,
  });

  return response;
};
