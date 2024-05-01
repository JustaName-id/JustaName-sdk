/**
 * Validates an API key against a specific regex pattern to ensure it meets the expected format.
 *
 * @param {string} apiKey - The API key to validate.
 * @returns {boolean} - True if the API key matches the regex pattern, indicating it is valid; otherwise, false.
 */
export const validateApiKey =(apiKey: string) => {
  const apiKeyRegex = /^[a-zA-Z0-9]{32}$/;

  return apiKeyRegex.test(apiKey);
}

/**
 * Validates a domain name against a specific regex pattern to ensure it follows the expected ENS domain format.
 *
 * @param {string} ensDomain - The domain name to validate.
 * @returns {boolean} - True if the domain name matches the regex pattern, indicating it is valid; otherwise, false.
 */
export const validateDomain = (ensDomain: string) => {
  const ensDomainRegex = /^[a-zA-Z0-9-]{1,61}\.[a-zA-Z]{2,}$/;

  return ensDomainRegex.test(ensDomain);
}

/**
 * Validates a generic input string based on non-emptiness and an optional custom validation function.
 *
 * @param {string} input - The input string to validate.
 * @param {string} name - The name of the input field being validated; used in feedback messages.
 * @param {(input: string) => boolean} [validate] - An optional custom validation function that takes the input string and returns a boolean value indicating validity.
 * @returns {string | boolean} - True if the input is valid; otherwise, a string message indicating why the validation failed.
 */
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