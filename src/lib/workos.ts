import {WorkOS} from '@workos-inc/node';

export function getWorkos() {
  const key = process.env.WORKOS_API_KEY;
  if (!key) {
    throw new Error('Missing WORKOS_API_KEY in environment');
  }
  return new WorkOS(key);
}

export default getWorkos;
