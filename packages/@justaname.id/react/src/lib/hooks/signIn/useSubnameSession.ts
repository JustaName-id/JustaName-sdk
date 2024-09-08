import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const SESSION_KEY = ['SUBNAME_SESSION']

export interface SubnameSession<T> {
  subname: string;
  address: string;
  metadata: Record<keyof T, any>;
}

export interface UseSubnameSession {
  subnameSession: SubnameSession<any> | null | undefined;
  subnameSessionPending: boolean;
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
        const json = await response.json() as SubnameSession<any>
        return response.status === 200 ? json : null
      }catch(e){
        return null
      }
    }
  })

  return{
    subnameSession: query.data,
    subnameSessionPending: query.isLoading,
    refreshSubnameSession: query.refetch
  }
}