import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';

export interface UseIsSubnameAvailableOptions {
  subname: string;
  ensDomain: string;
}

export const useIsSubnameAvailable = (props: UseIsSubnameAvailableOptions) => {
  const { justaname, chainId } = useJustaName();
  const { subname, ensDomain } = props;

  console.log(justaname, chainId, subname, ensDomain)
  const query = useQuery({
    queryKey: ['IS_SUBNAME_AVAILABLE', subname],
    queryFn: () => justaname?.subnames.checkSubnameAvailable({
        subname: subname + '.' + ensDomain,
        chainId
      }),
    enabled: Boolean(subname) && Boolean(justaname) && Boolean(chainId),
  })

  return {
    isAvailable: query.data,
    isLoading: query.isLoading,
  }
}