import { Prisma } from '@prisma/client';
import { Endpoints } from '@octokit/types';

export type { ChangeEvent } from 'react';

// Do not know why export * will make nextjs complain about
// can not find module '@octokit/types'
export type { RequestParameters } from '@octokit/types';
export type { ToastId } from '@chakra-ui/react';

export * from '@prisma/client';

export * from './vercel';

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export type JsonObject = Prisma.JsonObject;

export type ReposResponse = Endpoints['GET /repos/{owner}/{repo}']['response'];
