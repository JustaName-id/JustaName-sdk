'use client';

import {
  coinTypeMap,
  getCoinTypeDetails,
  SupportedCoins,
} from '@justaname.id/sdk';
import React, { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useDebounce } from '../../../hooks';
import { metadataForm } from '../../../forms';
import { validateCryptoAddress } from '../../../forms/addresses.schema';
import {
  AddCircleIcon,
  ArrowIcon,
  Badge,
  Flex,
  Input,
  P,
  Popover,
  PopoverContent,
  PopoverTrigger,
  WalletIcon,
} from '@justweb3/ui';
import { getChainIcon } from '../../../icons/chain-icons';
import { MetadataField } from '../MetadataField';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxHeight: 'calc(100% - 59px)',
        height: '100%',
      }}
    >
      <Flex direction="row" gap="10px" align="center">
        <WalletIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700 }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700 }}>Addresses</P>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        gap="10px"
        className="justweb3scrollbar"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100% - 50px)',
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

          <P style={{ fontSize: '16px', fontWeight: 500 }}>Add Address</P>
          <Flex gap={'5px'} justify={'center'} align={'center'}>
            <Input
              placeholder={'0x...'}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              style={{
                borderRadius: '10px',
                height: '22px',
                width: '100%',
              }}
              right={
                <Popover
                  open={chainDropdownOpen}
                  onOpenChange={(open) => setChainDropdownOpen(open)}
                >
                  <PopoverTrigger
                    disabled={filteredSuggestedCoins.length === 0}
                  >
                    <Badge
                      withCopy={false}
                      style={{
                        padding: '5px',
                      }}
                    >
                      {selectedCoin ? (
                        <Flex direction="row" gap="10px" align="center">
                          {getChainIcon(selectedCoinDetails.symbol, 15)}
                          <P
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              color: 'var(--justweb3-primary-color)',
                              transform: 'capitalize',
                            }}
                          >
                            {`${
                              selectedCoinDetails.symbol.split('Legacy')[0]
                            } ${
                              selectedCoinDetails.symbol.includes('Legacy')
                                ? 'Legacy'
                                : ''
                            }`}
                          </P>
                        </Flex>
                      ) : (
                        <P
                          style={{
                            fontSize: '10px',
                            fontWeight: 900,
                            color: 'var(--justweb3-primary-color)',
                          }}
                        >
                          CHAIN
                        </P>
                      )}
                      {filteredSuggestedCoins.length > 0 && (
                        <ArrowIcon
                          width={10}
                          color="var(--justweb3-primary-color)"
                          style={{
                            transition: 'all 0.3s',
                            transform: chainDropdownOpen
                              ? 'rotate(-90deg)'
                              : 'rotate(90deg)',
                          }}
                        />
                      )}
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent
                    portal={false}
                    sideOffset={5}
                    style={{
                      // backgroundColor: 'white',
                      padding: '10px',
                      gap: '10px',
                      overflowY: 'auto',
                      pointerEvents: 'auto',
                      maxHeight: '300px',
                      display: 'flex',
                      width: '120px',
                      flexDirection: 'column',
                      zIndex: 100000,
                    }}
                    className="justweb3scrollbar"
                  >
                    {filteredSuggestedCoins
                      ?.filter((coin) => coin !== '60')
                      .sort((a, b) => {
                        return getCoinTypeDetails(
                          a as SupportedCoins
                        ).symbol.localeCompare(
                          getCoinTypeDetails(b as SupportedCoins).symbol
                        );
                      })
                      ?.map((coin) => {
                        const coinDetails = getCoinTypeDetails(
                          coin as SupportedCoins
                        );
                        return (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              gap: '0.5rem',
                              alignItems: 'center',
                              cursor: form
                                .getValues('addresses')
                                .some((address) => address.coin === coin)
                                ? 'not-allowed'
                                : 'pointer',
                            }}
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
                            {selectedCoin === coin && <ArrowIcon width={15} />}
                            {getChainIcon(coinDetails.symbol, 15)}
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
                          </div>
                        );
                      })}
                  </PopoverContent>
                </Popover>
              }
            />
            <AddCircleIcon
              width={20}
              height={20}
              style={{
                cursor:
                  selectedCoin && debouncedAddress ? 'pointer' : 'not-allowed',
                flexShrink: 0,
                opacity: selectedCoin && debouncedAddress ? 1 : 0.5,
              }}
              onClick={() => {
                if (!selectedCoin || !debouncedAddress) return;
                append(
                  {
                    coin: selectedCoin,
                    address: debouncedAddress,
                  },
                  {
                    shouldFocus: true,
                  }
                );
                form.trigger();
                setSelectedCoin('');
                setAddress('');
                setTimeout(() => {
                  addressesRef.current?.scrollTo({
                    behavior: 'smooth',
                    top: addressesRef.current.scrollHeight,
                  });
                }, 200);
              }}
            />
          </Flex>

          {/*<Button*/}
          {/*  variant="secondary"*/}
          {/*  leftIcon={<AddIcon height={20} width={20} />}*/}
          {/*  onClick={() => {*/}
          {/*    append({*/}
          {/*      coin: selectedCoin,*/}
          {/*      address: debouncedAddress,*/}
          {/*    });*/}
          {/*    setSelectedCoin('');*/}
          {/*    setAddress('');*/}
          {/*  }}*/}
          {/*  disabled={!selectedCoin || !debouncedAddress}*/}
          {/*  style={{*/}
          {/*    width: 'fit-content',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Add Address*/}
          {/*</Button>*/}
        </Flex>
      </Flex>
    </div>
  );
};
