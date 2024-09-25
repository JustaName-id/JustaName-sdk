export const splitDomain = (domain: string): [string, string]=>{
  const parts = domain.split('.');

  if (parts.length === 2) {
    return ['', domain];
  }

  if (parts.length > 2) {
    return [parts.slice(0, -2).join('.'), parts.slice(-2).join('.')];
  }

  return ['', ''];
}