import { FC } from 'react';
import { Accordion } from '../../../ui/accordion';
import { Verified } from './Verified';
import { EFP } from './EFP';
import { POAP } from './POAP';
import { TalentProtocol } from './TalentProtocol';

export const PluginsSection: FC = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        Plugins
      </p>

      <Accordion type="single" collapsible className="w-full">
        <Verified />
        <EFP />
        <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
        <POAP />
        <div className="w-full h-[1px] min-h-[1px] bg-[#CBD5E180]" />
        <TalentProtocol />
      </Accordion>
    </div>
  );
};
