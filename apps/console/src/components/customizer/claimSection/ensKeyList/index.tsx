import Image from "next/image";
import { useState } from "react";
import { Input } from "../../../ui/input";
import { OptionSelect } from "../../optionSelect";

interface OptionSelectProps {
    selectedEns: string;
    onSelectEns: (ens: string) => void;
}

export const EnsKeyList = ({ selectedEns, onSelectEns }: OptionSelectProps) => {
    const [apiKey, setApiKey] = useState<string>("")
    return (
        <div className="flex flex-col gap-2.5 ">
            <p className='text-xs font-medium text-black'>My ENS</p>
            <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Justaname API Key"
                rightIcon={<Image src={"/static/help.svg"} width={15} height={15} alt="help-icon" />}
            />
            <OptionSelect label='ens.eth' value="ens.eth" />
            <OptionSelect label='ens2.eth' value="ens2.eth" />
        </div>
    )
}