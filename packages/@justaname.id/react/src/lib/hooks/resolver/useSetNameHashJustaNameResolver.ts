'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import {
  useReadContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { useOffchainResolvers } from '../offchainResolver/useOffchainResolvers';
import { useMountedAccount } from '../account/useMountedAccount';
import { getAddress, namehash } from '../../helpers/ethersCompat';

const ZeroAddress = '0x0000000000000000000000000000000000000000';

const REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const SEPOLIA_REGISTRAR_ADDRESS = '0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6';
const MAINNET_REGISTRAR_ADDRESS = '0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb';

const setResolverABI = [
  {
    constant: false,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
      {
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'setResolver',
    outputs: [],
    type: 'function',
  },
];

const setClaimWithResolverABI = [
  {
    constant: false,
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'claimWithResolver',
    outputs: [],
    type: 'function',
  },
];

const getResolverABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'resolver',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    type: 'function',
  },
];

const recordExistsABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'recordExists',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    type: 'function',
  },
];

/**
 *  Interface defining the parameters needed to set the JustaName resolver.
 *
 *  @typedef UseSetNameHashJustaNameResolver
 *  @type {object}
 *  @property {function} setNameHashJustaNameResolver - The function to set the JustaName resolver.
 *  @property {boolean} NameHashJustaNameResolverSet - Indicates if the JustaName resolver is set.
 *  @property {boolean} isSetNameHashJustaNameResolverPending - Indicates if the mutation is currently pending.
 *  @property {boolean} setNameHashJustaNameResolverError - Indicates if the mutation has led to an error.
 */
export interface UseSetNameHashJustaNameResolver<T = any> {
  setNameHashJustaNameResolver: () => Promise<void>;
  NameHashJustaNameResolverSet: boolean;
  isSetNameHashJustaNameResolverPending: boolean;
  setNameHashJustaNameResolverError: boolean;
}
/**
 * Custom hook for performing a mutation to set the JustaName resolver.
 *
 * @template T - The type of additional parameters that can be passed to the set JustaName resolver mutation, extending the base request.
 * @returns {UseSetNameHashJustaNameResolver} An object containing the `setNameHashJustaNameResolver` async function to initiate the JustaName resolve,a boolean `NameHashJustaNameResolverSet` indicating if the resolver is set,a boolean `setNameHashJustaNameResolverPending` indicating the state of the process, and a boolean `setNameHashJustaNameResolverError` indicating if an error has occured.
 */
export const useSetNameHashJustaNameResolver = <
  T = any
>(): UseSetNameHashJustaNameResolver<T> => {
  const { chainId, address } = useMountedAccount();
  const { offchainResolvers, isOffchainResolversPending } =
    useOffchainResolvers();

  const currentResolver = useMemo(() => {
    if (!chainId || !offchainResolvers || isOffchainResolversPending) return;
    return offchainResolvers?.offchainResolvers.find(
      (resolver) => resolver.chainId === chainId
    )?.resolverAddress;
  }, [offchainResolvers, chainId, isOffchainResolversPending]);

  const {
    data: recordExistsConfig,
    status: recordExistsStatus,
    refetch: recordExistsRefetch,
  } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: recordExistsABI,
    functionName: 'recordExists',
    args: [
      namehash(
        getAddress(address ?? ZeroAddress).substring(2) + '.addr.reverse'
      ),
    ],
    chainId: chainId,
    query: {
      enabled: address && address !== ZeroAddress
    }
  });

  const { data: setClaimWithResolverConfig } = useSimulateContract({
    address:
      chainId === 1 ? MAINNET_REGISTRAR_ADDRESS : SEPOLIA_REGISTRAR_ADDRESS,
    abi: setClaimWithResolverABI,
    functionName: 'claimWithResolver',
    args: [getAddress(address ?? ZeroAddress), currentResolver],
    chainId: chainId,
    query: {
      enabled: recordExistsStatus === 'success' && recordExistsConfig === false && address && address !== ZeroAddress,
    },
  });

  const {
    data: getResolverABIConfig,
    status: getResolverABIStatus,
    refetch: getResolverStatusRefetch,
  } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: getResolverABI,
    functionName: 'resolver',
    args: [
      namehash(
        getAddress(address ?? ZeroAddress).substring(2) + '.addr.reverse'
      ),
    ],
    chainId: chainId,
    query: {
      enabled: recordExistsStatus === 'success' && recordExistsConfig === true && address && address !== ZeroAddress
    },
  });

  const { data: setResolverConfig } = useSimulateContract({
    address: REGISTRY_ADDRESS,
    abi: setResolverABI,
    functionName: 'setResolver',
    args: [
      namehash(
        getAddress(address ?? ZeroAddress).substring(2) + '.addr.reverse'
      ),
      currentResolver,
    ],
    chainId: chainId,
    query: {
      enabled:
        getResolverABIStatus === 'success' &&
        (getResolverABIConfig as string).toLowerCase() !==
        currentResolver?.toLowerCase() && address && address !== ZeroAddress,
    },
  });

  const {
    writeContractAsync: setClaimWithResolverWrite,
    data: setClaimWithResolverData,
    reset: setClaimWithResolverReset,
  } = useWriteContract();

  const {
    writeContractAsync: setResolverConfigWrite,
    data: setResolverConfigData,
    reset: setResolverConfigReset,
  } = useWriteContract();

  const {
    isLoading: setResolverConfigDataIsLoading,
    isSuccess: setResolverConfigDataIsSuccess,
    isError: setResolverConfigDataIsError,
  } = useWaitForTransactionReceipt({ hash: setResolverConfigData });

  const {
    isLoading: setClaimWithResolverIsLoading,
    isSuccess: setClaimWithResolverIsSuccess,
    isError: setClaimWithResolverIsError,
  } = useWaitForTransactionReceipt({ hash: setClaimWithResolverData });

  const isResolverConfigured = useMemo(() => {
    if (!getResolverABIConfig) return false;
    return (
      (getResolverABIConfig as string).toLowerCase() ===
      currentResolver?.toLowerCase()
    );
  }, [getResolverABIConfig, currentResolver]);

  useEffect(() => {
    if (!setResolverConfigData && !setClaimWithResolverData) return;
    if (setResolverConfigData) {
      if (setResolverConfigDataIsSuccess) {
        recordExistsRefetch();
        getResolverStatusRefetch();
      }
      if (setResolverConfigDataIsSuccess || setResolverConfigDataIsError) {
        setResolverConfigReset();
      }
    }
    if (setClaimWithResolverData) {
      if (setClaimWithResolverIsSuccess) {
        recordExistsRefetch();
        getResolverStatusRefetch();
      }
      if (setClaimWithResolverIsSuccess || setClaimWithResolverIsError) {
        setClaimWithResolverReset();
      }
    }
  }, [
    setResolverConfigDataIsSuccess,
    setResolverConfigDataIsError,
    setResolverConfigData,
    setResolverConfigReset,
    setClaimWithResolverIsSuccess,
    setClaimWithResolverIsError,
    setClaimWithResolverData,
    setClaimWithResolverReset,
    getResolverStatusRefetch,
    recordExistsRefetch,
  ]);

  const noResultData = !setResolverConfigData && !setClaimWithResolverData;
  const setResolverConfigPending =
    !!setResolverConfigData && setResolverConfigDataIsLoading;
  const setClaimWithResolverPending =
    !!setClaimWithResolverData && setClaimWithResolverIsLoading;

  const mutate = useMutation<void, Error, T>({
    mutationFn: async () => {
      if (recordExistsStatus === 'success' && recordExistsConfig === false) {
        await setClaimWithResolverWrite(setClaimWithResolverConfig!.request);
      } else if (getResolverABIStatus === 'success') {
        if (!isResolverConfigured) {
          await setResolverConfigWrite(setResolverConfig!.request);
        }
      }
    },
  });

  return {
    setNameHashJustaNameResolver: mutate.mutateAsync as () => Promise<void>,
    NameHashJustaNameResolverSet:
      isResolverConfigured && getResolverABIStatus !== 'pending',
    isSetNameHashJustaNameResolverPending:
      !noResultData &&
      (setResolverConfigPending || setClaimWithResolverPending),
    setNameHashJustaNameResolverError:
      !noResultData &&
      (setResolverConfigDataIsError || setClaimWithResolverIsError),
  };
};
