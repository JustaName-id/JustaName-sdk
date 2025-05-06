import type { SVGProps } from 'react';


export const DentityIcon: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="15" height="15" {...props}><g clip-path="url(#Dentity_svg__a)"><path fill="url(#Dentity_svg__b)" d="M31.629 16c0 8.632-6.997 15.629-15.629 15.629S.371 24.632.371 15.999C.371 7.37 7.368.372 16 .372S31.629 7.368 31.629 16"></path><path fill="#353941" fill-rule="evenodd" d="M16 .742C7.573.742.742 7.573.742 16S7.573 31.258 16 31.258 31.258 24.427 31.258 16 24.427.742 16 .742M0 16C0 7.163 7.164 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16" clip-rule="evenodd"></path><path fill="#fff" d="M15.995 7.352a1.834 1.834 0 1 0 0-3.668 1.834 1.834 0 0 0 0 3.668M23.603 25.403q-2.688-3.654-4.172-5.893a20 20 0 0 1-2.17-4.227V9.247h-.14a2.63 2.63 0 0 1-2.304 0h-.035v6.499q0 4.9-1.368 7.05a4.4 4.4 0 0 1-3.94 2.15 7 7 0 0 1-2.3-.323v2.237q.484.196 1 .285.728.144 1.47.14 3.17 0 4.974-2.024t2.369-5.786q1.612 3.05 4.84 7.528h2.957z"></path></g><defs><linearGradient id="Dentity_svg__b" x1="16" x2="16" y1="0" y2="32" gradientUnits="userSpaceOnUse"><stop stop-color="#2B2E38"></stop><stop offset="1" stop-color="#040813"></stop></linearGradient><clipPath id="Dentity_svg__a"><path fill="#fff" d="M0 0h32v32H0z"></path></clipPath></defs></svg>
  );
};
