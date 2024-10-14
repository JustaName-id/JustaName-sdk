import { RadioGroupItem } from '../../ui/radioGroup';

interface OptionSelectProps {
  label: string;
  value: string;
  showFree?: boolean;
}

export const OptionSelect = ({ label, value, showFree }: OptionSelectProps) => {
  return (
    <div className="flex flex-row items-center justify-between p-2.5">
      <div className="flex flex-row gap-2.5 items-center">
        <label
          htmlFor={value}
          className="text-xs text-black font-medium leading-[100%]"
        >
          {label}
        </label>
        {showFree && (
          <p className="text-[10px] text-[#3280F4] font-black leading-[100%]">
            Free
          </p>
        )}
      </div>
      <RadioGroupItem value={value} id={value} />
      {/* <button
                onClick={() => onSelect(!selected)}
                className={`w-4 h-4 rounded-full border-[1px] border-black outline-white outline-[1px] ${selected ? 'bg-[#3280F4]' : 'bg-white'}`} /> */}
    </div>
  );
};
