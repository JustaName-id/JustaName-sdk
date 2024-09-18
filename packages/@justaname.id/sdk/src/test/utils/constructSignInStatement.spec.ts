import { constructSignInStatement, extractDataFromStatement } from '../../lib/utils/signInStatementHelpers';

describe('constructStatement', () => {
  it('should return a string with the ens', () => {
    const domain = 'justaname';
    const ens = 'test';
    const result = constructSignInStatement(domain, ens);
    expect(result).toBe(`I am signing in to ${domain} with the ens ${ens}`);
  });

  it("should extract the ens from the statement", () => {
    const domain = 'justaname';
    const ens = 'test';
    const result = constructSignInStatement(domain, ens);
    const extractedSubname = extractDataFromStatement(result);
    expect(extractedSubname.ens).toBe(ens);
    expect(extractedSubname.domain).toBe(domain);
  })
})