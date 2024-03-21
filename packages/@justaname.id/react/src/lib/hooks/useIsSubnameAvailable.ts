import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';

export interface UseIsSubnameAvailableOptions {
  username: string;
  ensDomain: string;
}

export const useIsSubnameAvailable = (props: UseIsSubnameAvailableOptions) => {
  const { justaname, chainId } = useJustaName();
  const { username, ensDomain } = props;

  const query = useQuery({
    queryKey: ['IS_SUBNAME_AVAILABLE', username],
    queryFn: () => justaname?.subnames.checkSubnameAvailable({
        subname: username + '.' + ensDomain,
        chainId
      }),
    enabled: Boolean(username) && Boolean(justaname) && Boolean(chainId),
  })

  return {
    isAvailable: query.data,
    isLoading: query.isLoading,
  }
}