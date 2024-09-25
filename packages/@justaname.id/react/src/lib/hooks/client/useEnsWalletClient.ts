import { ChainId } from '@justaname.id/sdk';
import { useWalletClient } from 'wagmi';
import { WalletClient, Transport, Account, Chain, RpcSchema } from 'viem';
import { addEnsContracts } from '@ensdomains/ensjs';
import { CheckedChainWithEns } from '@ensdomains/ensjs/contracts';

export interface UseEnsWalletClientResult {
  ensWalletClient: WalletClient<Transport, CheckedChainWithEns<Chain>, Account, RpcSchema> | undefined
  isEnsWalletClientPending: boolean
}

export interface UseEnsWalletClientParams {
  chainId?: ChainId
}

export const useEnsWalletClient = (props?: UseEnsWalletClientParams): UseEnsWalletClientResult => {
  const query = useWalletClient()

  const transformWalletToEnsWallet = (wallet: WalletClient<Transport, Chain, Account, RpcSchema> | undefined): WalletClient<Transport, CheckedChainWithEns<Chain>, Account, RpcSchema> | undefined => {
    if (!wallet) {
      return
    }

    return {
      ...wallet,
      chain: addEnsContracts(wallet.chain as Chain)
    } as WalletClient<Transport, CheckedChainWithEns<Chain>, Account, RpcSchema>
  }

  return {
    ensWalletClient:  transformWalletToEnsWallet(query.data as WalletClient<Transport, Chain, Account, RpcSchema>),
    isEnsWalletClientPending: query.isPending
  }
}