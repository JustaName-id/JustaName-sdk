import { useContext, useEffect, useMemo, useState } from 'react';
import { RadioGroup } from '../../../ui/radioGroup';
import { OptionSelect } from '../../../reusable/OptionSelect';
import { JustWeb3Context, useDebounce, useJustWeb3 } from '@justweb3/widget';
import { Input } from '../../../ui/input';
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
          Let User Claim a Subname From
        </p>
        <OptionSelect
          label={chainId === 1 ? defaultMainnetValue : defaultTestnetValue}
          value={chainId === 1 ? defaultMainnetValue : defaultTestnetValue}
          showFree
        />
        <div className="flex flex-col gap-2.5 p-2.5">
          <p className="text-xs font-medium text-black">
            My ENS ([subname].[yourens].eth)
          </p>
          <div
            className={
              'p-5 border-dashed border-2 border-black rounded-[8px] flex flex-col gap-2.5'
            }
          >
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Justaname API Key"
              rightIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                >
                  <g id="help">
                    <mask
                      id="mask0_1794_1160"
                      style={{
                        maskType: 'alpha',
                      }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="15"
                      height="16"
                    >
                      <rect
                        id="Bounding box"
                        y="0.5"
                        width="15"
                        height="15"
                        fill="#D9D9D9"
                      />
                    </mask>
                    <g mask="url(#mask0_1794_1160)">
                      <path
                        id="help_2"
                        d="M7.46875 11.75C7.6875 11.75 7.8724 11.6745 8.02344 11.5234C8.17448 11.3724 8.25 11.1875 8.25 10.9688C8.25 10.75 8.17448 10.5651 8.02344 10.4141C7.8724 10.263 7.6875 10.1875 7.46875 10.1875C7.25 10.1875 7.0651 10.263 6.91406 10.4141C6.76302 10.5651 6.6875 10.75 6.6875 10.9688C6.6875 11.1875 6.76302 11.3724 6.91406 11.5234C7.0651 11.6745 7.25 11.75 7.46875 11.75ZM6.90625 9.34375H8.0625C8.0625 9 8.10156 8.72917 8.17969 8.53125C8.25781 8.33333 8.47917 8.0625 8.84375 7.71875C9.11458 7.44792 9.32812 7.1901 9.48438 6.94531C9.64062 6.70052 9.71875 6.40625 9.71875 6.0625C9.71875 5.47917 9.50521 5.03125 9.07813 4.71875C8.65104 4.40625 8.14583 4.25 7.5625 4.25C6.96875 4.25 6.48698 4.40625 6.11719 4.71875C5.7474 5.03125 5.48958 5.40625 5.34375 5.84375L6.375 6.25C6.42708 6.0625 6.54427 5.85938 6.72656 5.64062C6.90885 5.42188 7.1875 5.3125 7.5625 5.3125C7.89583 5.3125 8.14583 5.40365 8.3125 5.58594C8.47917 5.76823 8.5625 5.96875 8.5625 6.1875C8.5625 6.39583 8.5 6.59115 8.375 6.77344C8.25 6.95573 8.09375 7.125 7.90625 7.28125C7.44792 7.6875 7.16667 7.99479 7.0625 8.20312C6.95833 8.41146 6.90625 8.79167 6.90625 9.34375ZM7.5 14.25C6.63542 14.25 5.82292 14.0859 5.0625 13.7578C4.30208 13.4297 3.64062 12.9844 3.07812 12.4219C2.51562 11.8594 2.07031 11.1979 1.74219 10.4375C1.41406 9.67708 1.25 8.86458 1.25 8C1.25 7.13542 1.41406 6.32292 1.74219 5.5625C2.07031 4.80208 2.51562 4.14062 3.07812 3.57812C3.64062 3.01562 4.30208 2.57031 5.0625 2.24219C5.82292 1.91406 6.63542 1.75 7.5 1.75C8.36458 1.75 9.17708 1.91406 9.9375 2.24219C10.6979 2.57031 11.3594 3.01562 11.9219 3.57812C12.4844 4.14062 12.9297 4.80208 13.2578 5.5625C13.5859 6.32292 13.75 7.13542 13.75 8C13.75 8.86458 13.5859 9.67708 13.2578 10.4375C12.9297 11.1979 12.4844 11.8594 11.9219 12.4219C11.3594 12.9844 10.6979 13.4297 9.9375 13.7578C9.17708 14.0859 8.36458 14.25 7.5 14.25Z"
                        fill="var(--primary)"
                      />
                    </g>
                  </g>
                </svg>
              }
            />

            <p className={'text-xs text-center'}>
              Go to the{' '}
              <a
                href={'https://dashboard.justaname.id'}
                target={'_blank'}
                className={'text-primary'}
              >
                Dashboard
              </a>{' '}
              to generate API keys
            </p>
            {ensByApiKey
              .filter((ens) => ens.chainId === chainId)
              .map((ens, index) => (
                <>
                  {index ===
                    ensByApiKey.filter((ens) => ens.chainId === chainId)
                      .length -
                      1 && (
                    <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
                  )}
                  <OptionSelect key={ens.ens} label={ens.ens} value={ens.ens} />
                </>
              ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
