import { SiwensParams } from '@justaname.id/siwens';
import { ChainId } from '../common';

export * from './signin-config'

export interface RequestSignInParams extends Omit<SiwensParams, 'domain' | 'origin' | 'chainId'> {
  origin?: string,
  domain?: string,
  chainId?: ChainId
  ttl?: number
}