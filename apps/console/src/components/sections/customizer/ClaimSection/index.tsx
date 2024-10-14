import { useContext, useEffect, useMemo, useState } from 'react';
import { RadioGroup } from '../../../ui/radioGroup';
import { OptionSelect } from '../../../reusable/OptionSelect';
import { JustWeb3Context, useDebounce, useJustWeb3 } from '@justweb3/widget';
import { Input } from '../../../ui/input';
import Image from 'next/image';
import axios from 'axios';
import { ChainId } from '@justaname.id/sdk';

export const ClaimSection = () => {
  const { config, handleJustWeb3Config } = useContext(JustWeb3Context);
  const { chainId } = useJustWeb3();

  const { ensDomains, dev } = config || {};
  const defaultTestnetValue = dev ? 'jaw.eth' : 'justan.eth';
  const defaultMainnetValue = dev ? 'justanexample.eth' : 'justan.id';

  const [testnetValue, setTestnetValue] = useState<string>(defaultTestnetValue);
  const [mainnetValue, setMainnetValue] = useState<string>(defaultMainnetValue);

  const currentVal = useMemo(() => {
    return chainId === 1 ? mainnetValue : testnetValue;
  }, [chainId, mainnetValue, testnetValue]);
  const _chainId = useMemo(() => {
    return chainId || 1;
  }, [chainId]);

  const [apiKey, setApiKey] = useState<string>('');
  const { debouncedValue } = useDebounce(apiKey, 1000);
  const [ensByApiKey, setEnsByApiKey] = useState<
    { ens: string; chainId: number }[]
  >([]);

  const handleEnsSelect = (ens: string, chainId: number) => {
    if (chainId === 1) {
      setMainnetValue(ens);
      handleJustWeb3Config({
        ...config,
        ensDomains: [
          ...(ensDomains || []).filter((ens) => ens.chainId !== 1),
          ...(ens === 'justanexample.eth' || ens === 'justan.id'
            ? []
            : [{ ensDomain: ens, apiKey: apiKey, chainId: 1 as ChainId }]),
        ],
      });
    }
    if (chainId === 11155111) {
      setTestnetValue(ens);
      handleJustWeb3Config({
        ...config,
        ensDomains: [
          ...(ensDomains || []).filter((ens) => ens.chainId !== 11155111),
          ...(ens === 'jaw.eth' || ens === 'justan.eth'
            ? []
            : [
                {
                  ensDomain: ens,
                  apiKey: apiKey,
                  chainId: 11155111 as ChainId,
                },
              ]),
        ],
      });
    }
  };

  useEffect(() => {
    if (!debouncedValue) {
      setEnsByApiKey([]);
      handleEnsSelect(defaultTestnetValue, 11155111);
      handleEnsSelect(defaultMainnetValue, 1);
      return;
    }
    axios
      .get<{
        result: {
          data: {
            domains: { ens: string; chainId: number }[];
          };
          error: string;
        };
        statusCode: number;
      }>(
        `https://${
          dev ? 'api-staging' : 'api'
        }.justaname.id/ens/v1/ens/api-key`,
        {
          headers: {
            'x-api-key': debouncedValue,
          },
        }
      )
      .then((res) => {
        setEnsByApiKey(res.data.result.data.domains);
      })
      .catch((err) => {
        console.log(err);
        setEnsByApiKey([]);
        handleEnsSelect(defaultTestnetValue, 11155111);
        handleEnsSelect(defaultMainnetValue, 1);
      });
  }, [debouncedValue]);

  return (
    <div className="flex flex-col gap-2.5">
      <RadioGroup
        value={currentVal}
        onValueChange={(value) => {
          handleEnsSelect(value, _chainId);
        }}
      >
        <p className="text-base text-black font-bold leading-[125%] my-[5px]">
          Claim A Subname
        </p>
        <OptionSelect
          label={chainId === 1 ? defaultMainnetValue : defaultTestnetValue}
          value={chainId === 1 ? defaultMainnetValue : defaultTestnetValue}
          showFree
        />
        <div className="flex flex-col gap-2.5 ">
          <p className="text-xs font-medium text-black">My ENS</p>
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Justaname API Key"
            rightIcon={
              <Image
                src={'/static/help.svg'}
                width={15}
                height={15}
                alt="help-icon"
              />
            }
          />

          {ensByApiKey
            .filter((ens) => ens.chainId === chainId)
            .map((ens) => (
              <OptionSelect key={ens.ens} label={ens.ens} value={ens.ens} />
            ))}
        </div>
      </RadioGroup>
    </div>
  );
};
