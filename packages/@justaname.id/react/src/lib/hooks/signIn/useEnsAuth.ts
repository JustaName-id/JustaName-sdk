import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const SESSION_KEY = ['SUBNAME_SESSION']

export interface SubnameSession {
  subname: string;
  address: string;
}

export interface UseSubnameSession {
  isLoggedIn: boolean;
  subnameSession: SubnameSession | null | undefined;
  isSubnameSessionPending: boolean;
  refreshSubnameSession: () => void;
}

export const useSubnameSession: <T = string[]> () => UseSubnameSession = () => {
  const { backendUrl, routes} = useJustaName()

  const query = useQuery({
    queryKey: SESSION_KEY,
    queryFn: async () => {
      try {


        const response = await fetch((backendUrl ?? '') + routes.sessionRoute, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const json = await response.json() as SubnameSession
        return response.status === 200 ? json : null
      }catch(e){
        return null
      }
    }
  })

  return{
    isLoggedIn: !!query.data,
    subnameSession: query.data,
    isSubnameSessionPending: query.isLoading,
    refreshSubnameSession: query.refetch
  }
}