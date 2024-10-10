import Image from "next/image";
import { Checkbox } from "../../../ui/checkbox";

interface SocialCardProps {
    title: string;
    logo: string;
    checked: boolean;
    onCheck: (title: string) => void;
    onUncheck: (title: string) => void
}

export const SocialCard: React.FC<SocialCardProps> = ({ checked, logo, onCheck, onUncheck, title }) => {
    return (
        <div className="flex flex-row justify-between w-full items-center py-2.5">
            <div className="flex flex-row justify-start items-center gap-2.5">
                <Image src={logo} alt={title} width={20} height={20} />
                <p className="text-xs font-medium text-black">{title}</p>
            </div>
            <Checkbox checked={checked} onCheckedChange={(checked) => {
                if (checked) {
                    onCheck(title);
                } else {
                    onUncheck(title);
                }
            }} />
        </div>
    )
}