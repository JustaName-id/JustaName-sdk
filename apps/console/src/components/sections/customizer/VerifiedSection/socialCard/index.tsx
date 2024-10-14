import { Checkbox } from '../../../../ui/checkbox';
import { ReactNode } from 'react';

interface SocialCardProps {
  title: string;
  logo: ReactNode;
  checked: boolean;
  value: string;
  disabled?: boolean;
  onCheck: (title: string) => void;
  onUncheck: (title: string) => void;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  checked,
  logo,
  onCheck,
  onUncheck,
  value,
  disabled,
  title,
}) => {
  return (
    <div className="flex flex-row justify-between w-full items-center py-2.5">
      <div className="flex flex-row justify-start items-center gap-2.5">
        {logo}
        <p className="text-xs font-medium text-black">{title}</p>
      </div>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onCheckedChange={(checked) => {
          if (checked) {
            onCheck(value);
          } else {
            onUncheck(value);
          }
        }}
      />
    </div>
  );
};
