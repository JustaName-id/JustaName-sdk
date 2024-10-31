import { FC } from 'react';
import { Accordion } from '../../../ui/accordion';
import { Verified } from './Verified';
import { EFP } from './EFP';

export const PluginsSection: FC = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base text-black font-bold leading-[125%] my-[5px]">
        Plugins
      </p>

      <Accordion type="single" collapsible className="w-full">
        <Verified />
        <EFP />
      </Accordion>
    </div>
  );
};
