import { SIWENS, SiweErrorType } from '../';

/**
 * CI-safe tests (no RPC required). These lock the EIP-4361 message format to be
 * byte-identical to what `siwe` produced before the viem migration, and verify
 * that field-mismatch checks throw the same `SiweError` types. Signature
 * verification (which needs a provider) is covered by the integration tests in
 * siwens.spec.ts.
 */

const ADDRESS = '0x59c44836630760F97b74b569B379ca94c37B93ca';
const DUMMY_SIGNATURE = '0x' + '00'.repeat(65);

// Golden string captured from `siwe`'s SiweMessage.prepareMessage() for the
// SIWENS object-construction inputs below (statement from `alice.eth`).
const GOLDEN_MESSAGE = `localhost wants you to sign in with your Ethereum account:
0x59c44836630760F97b74b569B379ca94c37B93ca

I am signing in with my ENS: alice.eth

URI: http://localhost:3333
Version: 1
Chain ID: 1
Nonce: abcdef1234567890
Issued At: 2024-01-01T00:00:00.000Z
Expiration Time: 2024-01-01T00:01:00.000Z`;

const baseParams = {
  domain: 'localhost',
  address: ADDRESS,
  uri: 'http://localhost:3333',
  version: '1',
  nonce: 'abcdef1234567890',
  chainId: 1,
  ttl: 60 * 1000,
  ens: 'alice.eth',
  issuedAt: '2024-01-01T00:00:00.000Z',
  expirationTime: '2024-01-01T00:01:00.000Z',
};

describe('SIWENS message format (golden)', () => {
  it('builds a byte-identical EIP-4361 message', () => {
    const siwens = new SIWENS({ params: { ...baseParams } });
    expect(siwens.prepareMessage()).toBe(GOLDEN_MESSAGE);
    expect(siwens.toMessage()).toBe(GOLDEN_MESSAGE);
  });

  it('round-trips when re-parsed from the string form', () => {
    const message = new SIWENS({ params: { ...baseParams } }).prepareMessage();
    const reparsed = new SIWENS({
      params: message,
      providerUrl: 'http://127.0.0.1:1',
    });
    expect(reparsed.address).toBe(ADDRESS);
    expect(reparsed.chainId).toBe(1);
    expect(reparsed.domain).toBe('localhost');
    expect(reparsed.nonce).toBe('abcdef1234567890');
    expect(reparsed.statement).toBe('I am signing in with my ENS: alice.eth');
  });
});

describe('SIWENS.verify field validation (no RPC)', () => {
  it('throws DOMAIN_MISMATCH with the preserved error shape', async () => {
    const siwens = new SIWENS({ params: { ...baseParams } });
    await expect(
      siwens.verify({ signature: DUMMY_SIGNATURE, domain: 'evil.com' })
    ).rejects.toMatchObject({
      success: false,
      error: { type: SiweErrorType.DOMAIN_MISMATCH },
      ens: 'alice.eth',
    });
  });

  it('throws NONCE_MISMATCH', async () => {
    const siwens = new SIWENS({ params: { ...baseParams } });
    await expect(
      siwens.verify({ signature: DUMMY_SIGNATURE, nonce: 'someOtherNonce123' })
    ).rejects.toMatchObject({
      error: { type: SiweErrorType.NONCE_MISMATCH },
    });
  });

  it('throws EXPIRED_MESSAGE when the message is past expiry', async () => {
    const siwens = new SIWENS({
      params: {
        ...baseParams,
        issuedAt: '2020-01-01T00:00:00.000Z',
        expirationTime: '2020-01-01T00:01:00.000Z',
      },
    });
    await expect(
      siwens.verify({ signature: DUMMY_SIGNATURE })
    ).rejects.toMatchObject({
      error: { type: SiweErrorType.EXPIRED_MESSAGE },
    });
  });

  it('returns a failure result instead of throwing when suppressExceptions is set', async () => {
    const siwens = new SIWENS({ params: { ...baseParams } });
    const result = await siwens.verify(
      { signature: DUMMY_SIGNATURE, domain: 'evil.com' },
      { suppressExceptions: true }
    );
    expect(result.success).toBe(false);
    expect(result.error?.type).toBe(SiweErrorType.DOMAIN_MISMATCH);
    expect(result.ens).toBe('alice.eth');
  });
});

describe('generateNonce', () => {
  it('produces alphanumeric nonces of sufficient length', () => {
    const nonce = SIWENS.generateNonce();
    expect(nonce).toMatch(/^[a-zA-Z0-9]{8,}$/);
  });

  it('produces a different nonce each call', () => {
    expect(SIWENS.generateNonce()).not.toBe(SIWENS.generateNonce());
  });
});
