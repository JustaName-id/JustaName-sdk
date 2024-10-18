import React from 'react';


interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  className
}) => {
  return (
    <div className={className} />
  );
};

export default Separator;