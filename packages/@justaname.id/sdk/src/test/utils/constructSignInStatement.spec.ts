import { constructSignInStatement, extractDataFromStatement } from '../../lib/utils/signInStatementHelpers';

describe('constructStatement', () => {
  it('should return a string with the subname', () => {
    const domain = 'justaname';
    const subname = 'test';
    const result = constructSignInStatement(domain, subname);
    expect(result).toBe(`I am signing in to ${domain} with the subname ${subname}`);
  });

  it("should extract the subname from the statement", () => {
    const domain = 'justaname';
    const subname = 'test';
    const result = constructSignInStatement(domain, subname);
    const extractedSubname = extractDataFromStatement(result);
    expect(extractedSubname.subname).toBe(subname);
    expect(extractedSubname.domain).toBe(domain);
  })
})