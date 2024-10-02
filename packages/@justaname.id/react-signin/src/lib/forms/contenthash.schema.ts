import * as yup from 'yup';
import { encodeContentHash, getProtocolType } from '@ensdomains/ensjs/utils';
import { BaseError } from '@ensdomains/ensjs';

export const ContentHashProviders = [
  'ipfs',
  'swarm',
  'onion',
  'skynet',
  'arweave',
] as const

export type ContentHashProvider = typeof ContentHashProviders[number]

export type ContentHashProviderOrAll = ContentHashProvider | 'all'

const contentHashToProtocols = {
  ipfs: ['ipfs', 'ipns'],
  swarm: ['bzz'],
  onion: ['onion', 'onion3'],
  skynet: ['sia'],
  arweave: ['arweave', 'ar'],
}

export const validateContentHash =
  (provider: ContentHashProviderOrAll) =>
    (_value?: string): string | boolean => {
      let value = _value
      if (!value) return true

      let output = getProtocolType(value)
      if (!output) {
        value = provider + '://' + value
        output = getProtocolType(value)
      }

      if (!output) return 'Invalid content hash'
      const { protocolType, decoded } = output
      if (
        provider !== 'all' &&
        !contentHashToProtocols[provider]?.includes(protocolType)
      )
        return 'Invalid protocol type'

      if (
        (['ipfs', 'bzz'].includes(protocolType) && decoded.length < 4) ||
        (protocolType === 'onion' && decoded.length !== 16) ||
        (protocolType === 'onion3' && decoded.length !== 56) ||
        (protocolType === 'sia' && decoded.length !== 46) ||
        (['arweave', 'ar'].includes(protocolType) && decoded.length !== 43)
      )
        return 'Invalid content id'

      try {
        encodeContentHash(value)
        return true
      } catch (e: unknown) {
        if (e instanceof BaseError) return e.message
        return 'Invalid content hash'
      }
    }
export const contentHashSchema = yup.object().shape({
  protocolType: yup.string().required(),
  decoded: yup.string().test((value, context) => {
    const { protocolType } = context.parent

    if (!protocolType) {
      return true
    }

    if (!value) {
      return context.createError({
        message: `Content hash for ${protocolType} is required`,
        path: context.path,
      })
    }

    const validator = validateContentHash(protocolType)(value)

    if (validator !== true) {
      return context.createError({
        message:
          typeof validator === 'string'
            ? validator
            : 'Invalid content hash',
        path: context.path,
      })
    }

    return true
  }),
})
