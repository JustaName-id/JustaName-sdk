import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';

export const buildIdentityResolutionByNameKey = (name: string) => [
  'IDENTITY_RESOLUTION_BY_NAME',
  name,
];
export const getIdentityResolutionByName = async (
  name: string
): Promise<string | null> => {
  try {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_PROVIDER_URL
    );
    const address = await provider.resolveName(name);
    return address;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

export const useIdentityResolution = (name: string, enabled: boolean) => {
  const query = useQuery({
    queryKey: buildIdentityResolutionByNameKey(name),
    queryFn: () => getIdentityResolutionByName(name),
    enabled: enabled && name.length > 4,
  });

  return {
    isIdentityResolving: query.isLoading,
    address: query.data,
    refetchIdentityResolution: query.refetch,
  };
};
