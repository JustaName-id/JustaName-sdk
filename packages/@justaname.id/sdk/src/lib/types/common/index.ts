export * from './subname.response';
export * from './pagination';
export * from './address';
export * from './iroute';


export interface Address {
  address: string;

  coinType: number;
}

export interface TextRecord {
  key: string;

  value: string;
}