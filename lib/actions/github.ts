'use server';

import { RequestParameters, Site } from '@/types';
// import { easypanel } from '@/lib/easypanel';

import { octokit } from '../octokit';

const defaultOptions: Partial<RequestParameters> = {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export const checkRepoExisting = async (idAsName: string) => {
  try {
    // const respose = await easypanel.login();
    // console.log('### respose: ', { respose });

    const response = await octokit.request(
      `GET /repos/sieutoc-customers/${idAsName}`,
      defaultOptions
    );

    return response.data;
  } catch (error: any) {
    console.log('### error: ', { error });
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

export type CreateRepoDto = Pick<Site, 'id' | 'slug'> & {
  homepage?: string;
  private?: boolean;
  template: string;
} & RequestParameters;

export const createRepo = async (data: CreateRepoDto) => {
  const response = await octokit.request(
    `POST /repos/websitesieutoc/${data.template}/generate`,
    {
      owner: 'sieutoc-customers',
      name: data.id,
      description: data.slug ?? '',
      private: data.private ?? true,
      include_all_branches: false,
      ...defaultOptions,
    }
  );

  return response;
};

export const addCollaborator = async (idAsName: string, username: string) => {
  const response = await octokit.request(
    `PUT /repos/sieutoc-customers/${idAsName}/collaborators/${username}`,
    {
      permission: 'maintain',
      ...defaultOptions,
    }
  );

  return response;
};

export const deleteRepo = async (idAsName: string) => {
  try {
    const response = await octokit.request(
      `DELETE /repos/sieutoc-customers/${idAsName}`,
      defaultOptions
    );

    return response;
  } catch (error: any) {
    // Sometimes the project does not exist, so we need silent this error
    if (error.status === 404) {
      return;
    }
    throw error;
  }
};
