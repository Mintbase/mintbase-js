import { mbjs } from './config/config';

export function isStoreV2(name: string): boolean {
  return name.endsWith(`.${mbjs.keys.mbContractV2}`);
}

export function standardizeString(name: string): string {
  return name.replace(/[^a-z0-9]+/gim, '').toLowerCase();
}
