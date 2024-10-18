import { ContentHash } from '@justaname.id/sdk'

export const filterUpdatedContentHash = (
    oldHash: ContentHash | null | undefined,
    updatedHash: ContentHash[],
) => {
    if (updatedHash.length === 0) return undefined
    if (!oldHash) {
        return {
            protocolType: updatedHash[0].protocolType,
            decoded: updatedHash[0].decoded,
        }
        // return updatedHash[0].protocolType + '://' + updatedHash[0].decoded
    }

    if (
        oldHash.protocolType === updatedHash[0].protocolType &&
        oldHash.decoded === updatedHash[0].decoded
    ) {
        return undefined
    }

    // return updatedHash[0].protocolType + '://' + updatedHash[0].decoded
    return {
        protocolType: updatedHash[0].protocolType,
        decoded: updatedHash[0].decoded,
    }
}
