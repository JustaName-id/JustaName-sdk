import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const SESSION_KEY = ['SUBNAME_SESSION']

export interface EnsAuth {
  ens: string;
  address: string;
}

export interface UseEnsAuth {
  isLoggedIn: boolean;
  ens: EnsAuth | null | undefined;
  isEnsAuthPending: boolean;
  refreshEnsAuth: () => void;
}

export const useEnsAuth: <T = string[]> () => UseEnsAuth = () => {
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
        const json = await response.json() as EnsAuth
        return response.status === 200 ? json : null
      }catch(e){
        return null
      }
    }
  })

  return{
    isLoggedIn: !!query.data,
    ens: query.data,
    isEnsAuthPending: query.isLoading,
    refreshEnsAuth: query.refetch
  }
}