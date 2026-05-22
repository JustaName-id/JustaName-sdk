import { resolveDefaultChain } from './resolveDefaultChain';

describe('resolveDefaultChain', () => {
  it('returns undefined when chainId is undefined (no wallet connected)', () => {
    // Regression: previously `!chainId === undefined` was always false, causing
    // an undefined chainId to silently fall through to mainnet — which then
    // locked the SDK into mainnet config when the user intended Sepolia.
    expect(resolveDefaultChain(undefined)).toBeUndefined();
  });

  it('passes through mainnet (1)', () => {
    expect(resolveDefaultChain(1)).toBe(1);
  });

  it('passes through Sepolia (11155111)', () => {
    expect(resolveDefaultChain(11155111)).toBe(11155111);
  });

  it('falls back to mainnet for unsupported chains', () => {
    expect(resolveDefaultChain(137)).toBe(1);
    expect(resolveDefaultChain(10)).toBe(1);
    expect(resolveDefaultChain(42161)).toBe(1);
  });
});
