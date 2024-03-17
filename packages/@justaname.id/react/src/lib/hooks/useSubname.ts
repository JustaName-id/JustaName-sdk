import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';


export const buildSubnameBySubnameKey = (subname: string) => ['SUBNAME_BY_SUBNAME', subname]

export interface UseSubnameOptions {
  subname: string;
}

export const useSubname = (props: UseSubnameOptions) => {
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