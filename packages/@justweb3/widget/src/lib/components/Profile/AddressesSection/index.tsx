'use client';

import {
  coinTypeMap,
  getCoinTypeDetails,
  SupportedCoins,
} from '@justaname.id/sdk';
import { CheckIcon, ChevronDown } from 'lucide-react';
import React, { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useDebounce } from '../../../hooks';
import { metadataForm } from '../../../forms';
import { validateCryptoAddress } from '../../../forms/addresses.schema';
import {
  AddIcon,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Flex,
  Input,
  P,
  WalletIcon,
} from '@justweb3/ui';
import { getChainIcon } from '../../../icons/chain-icons';
import styled from 'styled-components';
import { MetadataField } from '../MetadataField';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100% - 62px);
  height: 100%;
`;

const ChainCard = styled.div<{ isNotAllowed: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
  cursor: ${(props) => (props.isNotAllowed ? 'not-allowed' : 'pointer')};
`;

interface AddressesSectionProps {
  form: UseFormReturn<metadataForm>;
}

export const AddressesSection: React.FC<AddressesSectionProps> = ({ form }) => {
  const addressesRef = React.useRef<HTMLDivElement>(null);
  const [address, setAddress] = React.useState<string>('');
  const [selectedCoin, setSelectedCoin] = React.useState<string>('');
  const [chainDropdownOpen, setChainDropdownOpen] =
    React.useState<boolean>(false);
  const { debouncedValue: debouncedAddress, isDebouncing } = useDebounce(
    address,
    500
  );
  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'addresses',
  });

  const suggestedCoins = useMemo(() => {
    if (isDebouncing) return [];
    if (!debouncedAddress) return [];

    setTimeout(() => {
      addressesRef.current?.scrollTo({
        behavior: 'smooth',
        top: addressesRef.current.scrollHeight,
      });
    }, 200);

    return Object.keys(coinTypeMap).reduce((acc: string[], coin: string) => {
      if (
        validateCryptoAddress({
          coin: Number(coin),
          address: debouncedAddress,
        })
      ) {
        acc.push(coin);
      }
      return acc;
    }, []);
  }, [debouncedAddress, isDebouncing]);

  const selectedCoinDetails = useMemo(() => {
    return getCoinTypeDetails(selectedCoin as SupportedCoins);
  }, [selectedCoin]);

  const filteredSuggestedCoins = useMemo(() => {
    return suggestedCoins.filter(
      (coin) =>
        !form.getValues('addresses').some((address) => address.coin === coin)
    );
  }, [suggestedCoins, form.getValues('addresses')]);

  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <WalletIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700, color: 'black' }}>
            Edit Profile
          </P>
          <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>
            Addresses
          </P>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        gap="10px"
        className="justweb3scrollbar"
        style={{
          overflowY: 'scroll',
          maxHeight: 'calc(100% - 62px)',
        }}
        ref={addressesRef}
      >
        <Flex direction="column" gap="10px">
          {form.getValues('addresses').map((address, index) => {
            if (!address.coin) return null;
            const coinDetails = getCoinTypeDetails(
              address.coin as SupportedCoins
            );
            return (
              <MetadataField
                key={index}
                label={coinDetails.symbol}
                form={form}
                disabled={address.coin === '60'}
                leftIcon={getChainIcon(coinDetails.symbol)}
                fieldName={`addresses.${index}.address`}
                onDelete={
                  address.coin === '60'
                    ? undefined
                    : () => {
                        remove(index);
                      }
                }
              />
            );
          })}

          <P style={{ fontSize: '16px', fontWeight: 500, color: 'black' }}>
            Add Address
          </P>
          <Input
            placeholder={'0x...'}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            style={{
              paddingRight: '100px',
            }}
            right={
              <DropdownMenu
                open={chainDropdownOpen}
                onOpenChange={(open) => setChainDropdownOpen(open)}
              >
                <DropdownMenuTrigger
                  disabled={filteredSuggestedCoins.length === 0}
                >
                  <Flex
                    direction="row"
                    gap="4px"
                    align="center"
                    style={{
                      backgroundColor: 'white',
                    }}
                  >
                    {selectedCoin ? (
                      <Flex direction="row" gap="10px" align="center">
                        {getChainIcon(selectedCoinDetails.symbol)}
                        <P
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--justweb3-primary-color)',
                            transform: 'capitalize',
                          }}
                        >
                          {`${selectedCoinDetails.symbol.split('Legacy')[0]} ${
                            selectedCoinDetails.symbol.includes('Legacy')
                              ? 'Legacy'
                              : ''
                          }`}
                        </P>
                      </Flex>
                    ) : (
                      <P
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--justweb3-primary-color)',
                        }}
                      >
                        CHAIN
                      </P>
                    )}
                    {filteredSuggestedCoins.length > 0 && (
                      <ChevronDown
                        size={24}
                        style={{
                          transition: 'all 0.3s',
                          transform: chainDropdownOpen
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        }}
                      />
                    )}
                  </Flex>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    gap: '10px',
                    overflowY: 'scroll',
                    maxHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {filteredSuggestedCoins?.map((coin) => {
                    const coinDetails = getCoinTypeDetails(
                      coin as SupportedCoins
                    );
                    return (
                      <ChainCard
                        isNotAllowed={form
                          .getValues('addresses')
                          .some((address) => address.coin === coin)}
                        onClick={() => {
                          if (selectedCoin === coin) {
                            setSelectedCoin('');
                          } else {
                            setSelectedCoin(coin);
                          }
                          setChainDropdownOpen(false);
                        }}
                        key={coin}
                      >
                        {selectedCoin === coin && <CheckIcon size={24} />}
                        {getChainIcon(coinDetails.symbol)}
                        <P
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--justweb3-primary-color)',
                            transform: 'capitalize',
                            textAlign: 'center',
                          }}
                        >
                          {`${coinDetails.symbol.split('Legacy')[0]} ${
                            coinDetails.symbol.includes('Legacy')
                              ? 'Legacy'
                              : ''
                          }`}
                        </P>
                      </ChainCard>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
          <Button
            variant="secondary"
            leftIcon={<AddIcon height={20} width={20} />}
            onClick={() => {
              append({
                coin: selectedCoin,
                address: debouncedAddress,
              });
              setSelectedCoin('');
              setAddress('');
            }}
            disabled={!selectedCoin || !debouncedAddress}
            style={{
              width: 'fit-content',
              border: '1px solid #000000',
            }}
          >
            Add Address
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
