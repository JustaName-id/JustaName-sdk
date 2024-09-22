import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const buildEnsAuthKey = (backendUrl: string) => [
  'ENS_AUTH',
  backendUrl,
];

export type EnsAuth<T extends object = {}> = T & {
  ens: string;
  address: string;
};

export interface UseEnsAuthParams {
  backendUrl?: string;
}

export interface UseEnsAuthReturn<T extends object = {}> {
  isLoggedIn: boolean;
  connectedEns: EnsAuth<T> | null | undefined;
  isEnsAuthPending: boolean;
  refreshEnsAuth: () => void;
}

export const useEnsAuth = <T extends object = {}>({ backendUrl }: UseEnsAuthParams = {}): UseEnsAuthReturn<T> => {
  const { backendUrl: defaultBackendUrl , routes} = useJustaName()

  const query = useQuery({
    queryKey: buildEnsAuthKey(backendUrl || defaultBackendUrl || ''),
    queryFn: async () => {
      try {
        const response = await fetch((backendUrl || defaultBackendUrl || '') + routes.currentEnsRoute, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const json = await response.json()
        return response.status === 200 ? json : null
      }catch(e){
        return null
      }
    }
  })

  return{
    isLoggedIn: !!query.data,
    connectedEns: query.data,
    isEnsAuthPending: query.isLoading,
    refreshEnsAuth: query.refetch
  }
}