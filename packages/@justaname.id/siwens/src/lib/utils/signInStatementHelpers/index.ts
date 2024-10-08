import { InvalidStatementException } from '../../errors';

export function constructSignInStatement(subname:string, statement=""){
  return `I am signing in with my ENS: ${subname}` + (statement ? `, ${statement}` : "")
}

export function extractDataFromStatement(statement: string) {
  const regex = /I am signing in with my ENS: ([a-zA-Z0-9-_.]+)/;
  const result = regex.exec(statement);
  if (!result) {
    throw InvalidStatementException.invalidStatement();
  }
  return {
    ens: result[1]
  };
}