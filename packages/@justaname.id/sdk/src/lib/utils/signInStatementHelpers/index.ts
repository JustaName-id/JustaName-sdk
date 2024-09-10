import { InvalidStatementException } from '../../errors';

export function constructSignInStatement(domain:string, subname:string){
  return `I am signing in to ${domain} with the subname ${subname}`;
}

export function extractDataFromStatement(statement: string) {
  const regex = /I am signing in to ([a-zA-Z0-9-_.]+) with the subname ([a-zA-Z0-9-_.]+)/;
  const result = regex.exec(statement);
  if (!result) {
    throw InvalidStatementException.invalidStatement();
  }
  return {
    domain: result[1],
    subname: result[2]
  };
}