import { useJustaName } from '../providers';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { SubnameGetBySubnameResponse } from '@justaname.id/sdk';


export const buildSubnameBySubnameKey = (subname: string) => ['SUBNAME_BY_SUBNAME', subname]

export interface UseSubnameOptions {
  subname: string;
}

interface UseSubnameResult {
  subname: SubnameGetBySubnameResponse | undefined;
  isLoading: boolean;
  refetchSubname: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SubnameGetBySubnameResponse | undefined, unknown>>;
}



export const useSubname = (props: UseSubnameOptions) : UseSubnameResult => {
  const { justaname, chainId } = useJustaName()

  const query = useQuery({
    queryKey: buildSubnameBySubnameKey(props.subname),
    queryFn: () => justaname?.subnames.getBySubname({
       subname: props.subname,
        chainId: chainId}),
    enabled:  Boolean(justaname) && Boolean(props.subname),
  })

  return {
    subname: query.data,
    isLoading: query.isLoading,
    refetchSubname: query.refetch,
  }
}