import { randomStringForEntropy } from '@stablelib/random';

/**
 * Generates a cryptographically-secure, EIP-4361-compliant nonce.
 *
 * This mirrors `siwe`'s `generateNonce` (96 bits of entropy via a CSPRNG) so we
 * keep identical nonce strength/format after dropping the `siwe` dependency.
 * Intentionally NOT viem's `generateSiweNonce`, which is backed by `Math.random`
 * and would be a security regression.
 *
 * @returns {string} A randomly generated alphanumeric nonce.
 */
export function generateNonce(): string {
  const nonce = randomStringForEntropy(96);
  if (!nonce || nonce.length < 8) {
    throw new Error('Error during nonce creation.');
  }
  return nonce;
}
