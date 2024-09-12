import { InvalidSubnameException } from '../../errors';

export function checkDomainValid(domain:string){
  const parts = domain.split(".");
  if(parts.length < 2 || parts.length > 3){
    throw InvalidSubnameException.invalidSubnameFormat();
  }
  return true;
}
