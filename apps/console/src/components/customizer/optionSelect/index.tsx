
interface OptionSelectProps {
    label: string;
    selected: boolean;
    showFree?: boolean;
    onSelect: (selected: boolean) => void;
}

export const OptionSelect = ({ label, selected, onSelect, showFree }: OptionSelectProps) => {
    return (
        <div className="flex flex-row items-center justify-between p-2.5">
            <div className='flex flex-row gap-2.5 items-center'>
                <p className="text-xs text-black font-medium leading-[100%]">{label}</p>
                {showFree && <p className="text-[10px] text-[#3280F4] font-black leading-[100%]">Free</p>}
            </div>
            <button
                onClick={() => onSelect(!selected)}
                className={`w-4 h-4 rounded-full border-[1px] border-black outline-white outline-[1px] ${selected ? 'bg-[#3280F4]' : 'bg-white'}`} />
        </div>
    )
}