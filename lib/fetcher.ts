import { HttpMethod } from '@/types';
import deepmerge from 'deepmerge';

type FetchParams = Parameters<typeof fetch>;

export async function fetcher<R = unknown>(
  input: FetchParams[0],
  init?: FetchParams[1]
): Promise<R> {
  const options = deepmerge(
    {
      method: HttpMethod.GET,
      headers: { 'Content-Type': 'application/json' },
    },
    init ?? {}
  );

  const response = await fetch(input, options);

  // Sometime the body can be empty, and the json() will fail
  if (response.status === 204 || response.statusText === 'No Content') {
    return JSON.parse('{}');
  }

  return await response.json();
}
