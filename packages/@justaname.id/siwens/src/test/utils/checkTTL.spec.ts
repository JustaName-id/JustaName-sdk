import { InvalidTimeException } from '../../lib/errors/InvalidTime.exception';
import { checkTTL } from '../../lib/utils/checkTTL';


describe('checkTTL', () => {
  it('should return true if ttl is valid', () => {
    expect(checkTTL(300)).toBe(true);
  })

  it('should throw an error if ttl is invalid', () => {
    expect(() => checkTTL(-1)).toThrow(
      InvalidTimeException.timeValueLessThanZero()
    )
  })

  it('should throw an error if ttl is invalid', () => {
    expect(() => checkTTL(0)).toThrow(
      InvalidTimeException.timeValueLessThanZero()
    )
  })

  it('should throw an error if ttl is invalid', () => {
    expect(() => checkTTL(Number.MAX_SAFE_INTEGER)).toThrow(
      InvalidTimeException.timeExceedsMaxSafeInteger()
    )
  })
})