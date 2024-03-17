export const validateApiKey =(apiKey: string) => {
  const apiKeyRegex = /^[a-zA-Z0-9]{32}$/;

  return apiKeyRegex.test(apiKey);
}

export const validateDomain = (ensDomain: string) => {
  const ensDomainRegex = /^[a-zA-Z0-9-]{1,61}\.[a-zA-Z]{2,}$/;

  return ensDomainRegex.test(ensDomain);
}

export const validateInput = (input: string, name: string, validate?: (input: string) => boolean) => {
  if (!input.trim()) {
    return `${name} cannot be empty.`;
  }

  if(validate) {
    if (!validate(input)) {
      return `${name} is invalid.`;
    }
  }

  return true;
};