import { constructSignInStatement, extractDataFromStatement } from '../../lib/utils/signInStatementHelpers';
import { InvalidStatementException } from '@justaname.id/siwens';

describe('constructStatement', () => {
  it('should return a string with the ens', () => {
    const ens = 'test';
    const result = constructSignInStatement(ens);
    expect(result).toBe(`I am signing in with my ENS: ${ens}`);
  });

  it("should extract the ens from the statement", () => {
    const ens = 'test';
    const result = constructSignInStatement(ens);
    const extractedSubname = extractDataFromStatement(result);
    expect(extractedSubname.ens).toBe(ens);
  })

  it("should extract the ens from the statement with a statement", () => {
    const ens = 'test';
    const statement = "test statement";
    const result = constructSignInStatement(ens, statement);
    const extractedSubname = extractDataFromStatement(result);
    expect(extractedSubname.ens).toBe(ens);
  })

  it("should throw an error if the statement is invalid", () => {
    const statement = "invalid statement";
    expect(() => extractDataFromStatement(statement)).toThrow(InvalidStatementException.invalidStatement());
  })
})