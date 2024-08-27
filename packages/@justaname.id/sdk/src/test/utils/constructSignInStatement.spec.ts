import { constructSignInStatement } from '../../lib/utils/constructSignInStatement';

describe('constructStatement', () => {
  it('should return a string with the subname', () => {
    expect(constructSignInStatement('test')).toBe('I want to sign in as test');
  })
})