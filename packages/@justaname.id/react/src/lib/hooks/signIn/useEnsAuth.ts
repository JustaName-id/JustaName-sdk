import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const SESSION_KEY = ['SUBNAME_SESSION']

export type EnsAuth<T extends object = {}> = T & {
  ens: string;
  address: string;
};

export interface UseEnsAuthReturn<T extends object = {}> {
  isLoggedIn: boolean;
  connectedEns: EnsAuth<T> | null | undefined;
  isEnsAuthPending: boolean;
  refreshEnsAuth: () => void;
}

export const useEnsAuth: <T extends object = {}> () => UseEnsAuthReturn<T> = () => {
  const { backendUrl, routes} = useJustaName()

  const query = useQuery({
    queryKey: SESSION_KEY,
    queryFn: async () => {
      try {
        const response = await fetch((backendUrl ?? '') + routes.currentEnsRoute, {
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