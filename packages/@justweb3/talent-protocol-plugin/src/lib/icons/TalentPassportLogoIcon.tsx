import type { SVGProps } from 'react';

export interface TalentPassportIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export default function TalentPassportLogoIcon({
  color,
  ...props
}: TalentPassportIconProps) {
  return (
    <svg
      width="11"
      height="25"
      viewBox="0 0 11 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.6946 10.3119C1.1754 10.7914 1.8166 11.0311 2.618 11.0311H10.8148L9.8916 8.3941H3.366C2.8674 8.3941 2.618 8.1278 2.618 7.595V1.1076L0 0.216797V8.3941C0 9.1932 0.2315 9.8325 0.6946 10.3119Z"
        fill={color || 'var(--justweb3-primary-color)'}
      />
      <path
        d="M0.6946 23.4975C1.1754 23.9769 1.8166 24.2167 2.618 24.2167H10.8148L9.8916 21.5797H3.366C2.8674 21.5797 2.618 21.3133 2.618 20.7806V14.2931L0 13.4023V21.5797C0 22.3788 0.2315 23.018 0.6946 23.4975Z"
        fill={color || 'var(--justweb3-primary-color)'}
      />
    </svg>
  );
}
