import { RadioGroup } from "../../ui/radioGroup";
import { OptionSelect } from "../optionSelect";
import { EnsSignList } from "./ensSignList";


export const SignSection = () => {
    return (
        <div className="flex flex-col gap-2.5">
            <RadioGroup defaultValue="claimable-ens">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">Sign In</p>
                <OptionSelect label='Chosen Claimable ENS' value="claimable-ens" />
                <OptionSelect label='Any ENS & Subname' value="any" />
                <EnsSignList />
            </RadioGroup>
        </div>
    )
}