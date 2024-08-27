import { InvalidSubnameException } from '../../lib/errors/InvalidSubname.exception';
import { checkDomainValid } from '../../lib/utils/checkDomainValid';

const VALID_DOMAIN = 'test.justaname.id';
const INVALID_DOMAIN = 'test.justaname.id.id';
const INVALID_DOMAIN_2 = 'test'

describe('checkDomainValid', () => {
  it('should return true if domain is valid', () => {
    expect(checkDomainValid(VALID_DOMAIN)).toBe(true);
  })

  it('should throw an error if domain is invalid', () => {
    expect(() => checkDomainValid(INVALID_DOMAIN)).toThrow(
      InvalidSubnameException.invalidSubnameFormat()
    )
  })

  it('should throw an error if domain is invalid', () => {
    expect(() => checkDomainValid(INVALID_DOMAIN_2)).toThrow(
      InvalidSubnameException.invalidSubnameFormat()
    )
  })
})