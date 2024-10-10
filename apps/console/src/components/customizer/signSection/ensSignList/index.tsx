import Image from "next/image";
import { useState } from "react";
import { Input } from "../../../ui/input";
import { RadioGroupItem } from "../../../ui/radioGroup";
import { EnsCard } from "./ensCard";


export const EnsSignList = () => {
    const [ensList, setEnsList] = useState<string[]>(["yaw.eth", "myaw.eth"])
    const [ensInput, setEnsInput] = useState<string>("")

    const handleDeleteEns = (ens: string) => {
        const result = ensList.filter((ensl) => ensl !== ens)
        setEnsList(result);
    }
    return (
        <div className="flex flex-col gap-2.5 ">
            <p className='text-xs font-medium text-black'>My ENS</p>
            <div className="flex flex-row justify-between items-center gap-2.5 pr-2.5">
                <Input
                    value={ensInput}
                    onChange={(e) => setEnsInput(e.target.value)}
                    placeholder="Add ENS"
                    rightIcon={<Image src={"/static/help.svg"} width={15} height={15} alt="help-icon" />}
                />
                <RadioGroupItem value={"specific"} id={"specific"} />
            </div>
            <div className="flex flex-row items-center gap-2.5">
                {ensList.map((ens) =>
                    <EnsCard ens={ens} onDelete={handleDeleteEns} />
                )}
            </div>
        </div>
    )
}