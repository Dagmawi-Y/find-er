import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    name: 'Test',
  };
}) satisfies PageServerLoad;
