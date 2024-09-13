import { InvalidTimeException } from '../../errors';

export  function checkTTL(ttl:number){
  if (ttl <= 0){
    throw InvalidTimeException.timeValueLessThanZero();
  }
  if((ttl + Date.now()) >= Number.MAX_SAFE_INTEGER) {
    throw InvalidTimeException.timeExceedsMaxSafeInteger();
  }

  return true;
}