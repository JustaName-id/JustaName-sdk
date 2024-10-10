import { RadioGroup } from "../../ui/radioGroup";
import { OptionSelect } from "../optionSelect";
import { EnsKeyList } from "./ensKeyList";

export const ClaimSection = () => {
    return (
        <div className="flex flex-col gap-2.5">
            <RadioGroup defaultValue="justan.id">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">Claim A Subname</p>
                <OptionSelect label='Justan.id' value="justan.id" showFree />
                <EnsKeyList selectedEns='' onSelectEns={(ens) => { }} />
            </RadioGroup>
        </div>
    )
}