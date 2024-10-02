"use client";

import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useMountedAccount } from '../account/useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameUpdateParams } from '@justaname.id/sdk';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useEnsWalletClient } from '../client/useEnsWalletClient';
import { setAddressRecord, setContentHashRecord, setRecords, setTextRecord } from '@ensdomains/ensjs/wallet';
import { useRecords } from '../records';
import { splitDomain } from '../../helpers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { useUpdateChanges } from './useUpdateChanges';

/**
 * Defines the structure for the base request needed to claim a subname.
 * 
 * @typedef BaseClaimSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed or updated.
 */
export interface SubnameUpdate extends Omit<SubnameUpdateParams, 'username' | 'ensDomain'> {
  fullEnsDomain: string;
  providerUrl?: string;
}

export interface UseUpdateSubnameResult {
  updateSubname: UseMutateAsyncFunction<void, Error, SubnameUpdate>;
  isUpdateSubnamePending: boolean;
}

/**
 * Custom hook to handle the subname claim or update process.
 *
 * @template T Additional request parameters that can be merged with the base request structure.
 * @returns {UseUpdateSubnameResult} An object containing methods and properties to handle the mutation state.
 */

export const useUpdateSubname = () : UseUpdateSubnameResult => {
  const { justaname,chainId, providerUrl } = useJustaName();
  const { address } = useMountedAccount()
  const { getSignature} = useSubnameSignature()
  const { refetchAccountSubnames } = useAccountSubnames()
  const { getRecords } = useRecords()
  const queryClient = useQueryClient()
  const { ensWalletClient } = useEnsWalletClient();
  const { ensClient } = useEnsPublicClient()
  const { checkIfUpdateIsValid, getUpdateChanges} = useUpdateChanges()

  const mutate = useMutation<void,  Error, SubnameUpdate>
  ({
    mutationFn: async (
      params: SubnameUpdate
    ) => {
      if (!address) {
        throw new Error('No address found');
      }
      const { fullEnsDomain } = params;
      const currentProviderUrl = params.providerUrl ? params.providerUrl : providerUrl;
      const currentChainId = params.chainId ? params.chainId : chainId;
      const records = await getRecords({
        fullName: fullEnsDomain,
        providerUrl: currentProviderUrl,
        chainId: currentChainId,
      })

      if (!records || !records.records) {
        throw new Error('No records found')
      }

      if (records.records.isJAN) {
        const signature = await getSignature()

        const [username, ensDomain] = splitDomain(fullEnsDomain)
        await justaname.subnames.updateSubname({
          addresses: params.addresses,
          chainId: currentChainId,
          contentHash: params.contentHash,
          ensDomain: ensDomain,
          text: params.text,
          username: username,
        }, {
          xAddress: address,
          xSignature: signature.signature,
          xMessage: signature.message,
        });
      }
      else {

        if (!ensWalletClient) {
          throw new Error('No wallet client found')
        }

        const changeIsValid = await checkIfUpdateIsValid(params)
        if (!changeIsValid) {
          return
        }


        let changes = 0
        const {
          changedAddresses,
          changedTexts,
          changedContentHash,
        } = await getUpdateChanges(params)

        if (changedAddresses && changedAddresses.length > 0) {
          changes++
        }

        if (changedTexts && changedTexts.length > 0) {
          changes++
        }

        if (changedContentHash) {
          changes++
        }

        if (changes === 0) {
          return
        }

        let hash: `0x${string}` | undefined
        if (changes === 1) {
          if (changedAddresses && changedAddresses.length === 1) {
            hash = await setAddressRecord(ensWalletClient, {
              name: fullEnsDomain,
              account: address,
              coin: changedAddresses[0].coinType,
              value: changedAddresses[0].address,
              resolverAddress: records.records.resolverAddress as `0x${string}`,
            })
          }

          if (changedTexts && changedTexts.length === 1) {
            hash = await setTextRecord(ensWalletClient, {
              name: fullEnsDomain,
              account: address,
              key: changedTexts[0].key,
              value: changedTexts[0].value,
              resolverAddress: records.records.resolverAddress as `0x${string}`,
            })
          }

          if (changedContentHash) {
            hash = await setContentHashRecord(ensWalletClient, {
              name: fullEnsDomain,
              account: address,
              contentHash: changedContentHash,
              resolverAddress: records.records.resolverAddress as `0x${string}`,
            })
          }
        }

        if (!hash) {
          hash = await setRecords(ensWalletClient, {
            name: fullEnsDomain,
            account: address,
            coins: changedAddresses && changedAddresses.length > 0 ? changedAddresses.map((address) => ({
              value: address.address,
              coin: address.coinType
            })) : undefined,
            texts: changedTexts && changedTexts.length > 0 ? changedTexts : undefined,
            contentHash: changedContentHash,
            resolverAddress: records.records.resolverAddress as `0x${string}`,
          })
        }

        await ensClient?.waitForTransactionReceipt({ hash })
      }

      getRecords({
        fullName: fullEnsDomain,
        providerUrl: currentProviderUrl,
        chainId: currentChainId,
      }, true).then(() => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.includes('ENS_UPDATE_CHANGES')
          }
        })
      })
      refetchAccountSubnames()
      return
    },
  })

  return {
    updateSubname: mutate.mutateAsync,
    isUpdateSubnamePending: mutate.isPending,
  }
}