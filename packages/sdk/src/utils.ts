
export function standardizeString(name: string): string {
  return name.replace(/[^a-z0-9]+/gim, '').toLowerCase();
}
