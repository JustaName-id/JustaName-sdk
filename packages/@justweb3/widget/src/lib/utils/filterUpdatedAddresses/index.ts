import { Address, Coin } from '@justaname.id/sdk'

export const filterUpdatedAddresses = (
    oldAddresses: Coin[],
    updatedAddresses: Address[],
) => {
    const filteredAddresses: Address[] = []
    updatedAddresses.forEach((address) => {
        if (address.coinType === 60) return
        const keyIndex = oldAddresses.findIndex(
            (m) => m.id === address.coinType,
        )
        if (keyIndex !== -1) {
            if (address.address !== oldAddresses[keyIndex].value) {
                filteredAddresses.push(address)
            }
        } else {
            filteredAddresses.push(address)
        }
    })
    oldAddresses.forEach((address) => {
        const keyIndex = updatedAddresses.findIndex(
            (m) => m.coinType === address.id,
        )
        if (keyIndex === -1) {
            filteredAddresses.push({
                coinType: address.id,
                address: '',
            })
        }
    })
    return filteredAddresses
}
