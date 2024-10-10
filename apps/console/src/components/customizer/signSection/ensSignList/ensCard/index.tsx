import Image from "next/image";

interface EnsCardProps {
    ens: string
    onDelete: (ens: string) => void
}

export const EnsCard: React.FC<EnsCardProps> = ({ ens, onDelete }) => {
    return (
        <div className="flex flex-row justify-between gap-[5px] rounded-[100px] p-[5px] bg-[#0000000D]">
            <p className="text-[10px] font-black text-[#00000080]">{ens}</p>
            <Image
                src={"/static/delete.svg"}
                width={10}
                height={10}
                alt="delete-icon"
                className="cursor-pointer"
                onClick={() => onDelete(ens)} />
        </div>
    )
}