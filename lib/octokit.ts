import { Octokit } from '@octokit/core';

declare global {
  // We need var in declare global
  // eslint-disable-next-line no-var, vars-on-top
  var octokit: Octokit | undefined;
}

const octokit = global.octokit || new Octokit({ auth: process.env.GITHUB_TOKEN });

if (process.env.NODE_ENV === 'development') {
  global.octokit = octokit;
}

export { octokit };
