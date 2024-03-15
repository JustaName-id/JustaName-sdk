import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';

export interface UseIsSubnameAvailableOptions {
  subname: string;
}

export const useIsSubnameAvailable = (props: UseIsSubnameAvailableOptions) => {
  const { justaname, chainId } = useJustaName();
  const { subname } = props;

  const query = useQuery({
    queryKey: ['IS_SUBNAME_AVAILABLE', subname],
    queryFn: async () => {
      return justaname?.subnames.checkSubnameAvailable({
        subname,
        chainId
      })
    },
    enabled: Boolean(subname),
  })

  return {
    isAvailable: query.data,
    isLoading: query.isLoading,
  }
}