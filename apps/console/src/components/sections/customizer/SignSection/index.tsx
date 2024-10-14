import { RadioGroup, RadioGroupItem } from '../../../ui/radioGroup';
import { OptionSelect } from '../../../reusable/OptionSelect';
import { useContext, useEffect, useState } from 'react';
import { JustWeb3Context, JustWeb3ProviderConfig } from '@justweb3/widget';
import { Input } from '../../../ui/input';
import Image from 'next/image';

export const SignSection = () => {
  const { handleJustWeb3Config, config } = useContext(JustWeb3Context);
  const [ensList, setEnsList] = useState<string[]>([]);
  const [ensInput, setEnsInput] = useState<string>('');

  useEffect(() => {
    if (config.allowedEns === 'all' || config.allowedEns === 'claimable') {
      return;
    }

    handleJustWeb3Config({
      ...config,
      allowedEns: ensList,
    });
  }, [ensList]);

  return (
    <div className="flex flex-col gap-2.5">
      <RadioGroup
        defaultValue="all"
        onValueChange={(e) => {
          const action = e as JustWeb3ProviderConfig['allowedEns'];
          handleJustWeb3Config({
            ...config,
            allowedEns:
              action === 'all' || action === 'claimable' ? action : ensList,
          });
        }}
      >
        <p className="text-base text-black font-bold leading-[125%] my-[5px]">
          Sign In
        </p>
        <OptionSelect label="Claimable ENS" value="claimable" />
        <OptionSelect label="Any ENS & Subname" value="all" />
        <div className="flex flex-col gap-2.5 ">
          <p className="text-xs font-medium text-black">
            Claimable and Specific ENS
          </p>
          <div className="flex flex-row justify-between items-center gap-2.5 pr-2.5">
            <Input
              value={ensInput}
              onChange={(e) => setEnsInput(e.target.value)}
              placeholder="Add ENS"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setEnsList([...ensList, ensInput]);
                  setEnsInput('');
                }
              }}
              rightIcon={
                <Image
                  src={'/static/help.svg'}
                  width={15}
                  height={15}
                  alt="help-icon"
                />
              }
            />
            <RadioGroupItem value={'specific'} id={'specific'} />
          </div>
          <div className="flex flex-row items-center gap-2.5">
            {ensList.map((_ens) => (
              <div
                key={'ens-card-' + _ens}
                className="flex flex-row justify-between gap-[5px] rounded-[100px] p-[5px] bg-[#0000000D]"
              >
                <p className="text-[10px] font-black text-[#00000080]">
                  {_ens}
                </p>
                <Image
                  src={'/static/delete.svg'}
                  width={10}
                  height={10}
                  alt="delete-icon"
                  className="cursor-pointer"
                  onClick={() => {
                    setEnsList(ensList.filter((ensl) => ensl !== _ens));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
