import React from 'react';

export interface EditIconProps extends React.SVGProps<SVGSVGElement> {}


export const EditIcon: React.FC<EditIconProps> = (props) => {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_1845_381" style={{
        maskType: "alpha"
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="11" height="11">
        <rect x="0.5" y="0.5" width="10" height="10" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1845_381)">
        <path
          d="M2.1665 8.83317V7.6665C2.1665 7.43039 2.22727 7.21338 2.3488 7.01546C2.47032 6.81755 2.63178 6.6665 2.83317 6.56234C3.26373 6.34706 3.70123 6.1856 4.14567 6.07796C4.59012 5.97032 5.0415 5.9165 5.49984 5.9165C5.75678 5.9165 6.01025 5.93213 6.26025 5.96338C6.51025 5.99463 6.76025 6.04498 7.01025 6.11442L6.31234 6.82275C6.17345 6.80192 6.03803 6.78456 5.90609 6.77067C5.77414 6.75678 5.63873 6.74984 5.49984 6.74984C5.11095 6.74984 4.72553 6.79671 4.34359 6.89046C3.96164 6.98421 3.58317 7.12484 3.20817 7.31234C3.14567 7.34706 3.09532 7.39567 3.05713 7.45817C3.01893 7.52067 2.99984 7.59012 2.99984 7.6665V7.99984H5.49984V8.83317H2.1665ZM6.33317 9.24984V7.96859L8.63525 5.67692C8.69775 5.61442 8.7672 5.56928 8.84359 5.5415C8.91998 5.51373 8.99637 5.49984 9.07275 5.49984C9.15609 5.49984 9.23595 5.51546 9.31234 5.54671C9.38873 5.57796 9.45817 5.62484 9.52067 5.68734L9.90609 6.07275C9.96164 6.13525 10.005 6.2047 10.0363 6.28109C10.0675 6.35748 10.0832 6.43387 10.0832 6.51025C10.0832 6.58664 10.0693 6.66477 10.0415 6.74463C10.0137 6.82449 9.96859 6.89567 9.90609 6.95817L7.61442 9.24984H6.33317ZM6.95817 8.62484H7.354L8.61442 7.354L8.42692 7.15609L8.229 6.96859L6.95817 8.229V8.62484ZM8.42692 7.15609L8.229 6.96859L8.61442 7.354L8.42692 7.15609ZM5.49984 5.49984C5.0415 5.49984 4.64914 5.33664 4.32275 5.01025C3.99637 4.68387 3.83317 4.2915 3.83317 3.83317C3.83317 3.37484 3.99637 2.98248 4.32275 2.65609C4.64914 2.3297 5.0415 2.1665 5.49984 2.1665C5.95817 2.1665 6.35053 2.3297 6.67692 2.65609C7.00331 2.98248 7.1665 3.37484 7.1665 3.83317C7.1665 4.2915 7.00331 4.68387 6.67692 5.01025C6.35053 5.33664 5.95817 5.49984 5.49984 5.49984ZM5.49984 4.6665C5.729 4.6665 5.92518 4.58491 6.08838 4.42171C6.25157 4.25852 6.33317 4.06234 6.33317 3.83317C6.33317 3.604 6.25157 3.40782 6.08838 3.24463C5.92518 3.08143 5.729 2.99984 5.49984 2.99984C5.27067 2.99984 5.07449 3.08143 4.9113 3.24463C4.7481 3.40782 4.6665 3.604 4.6665 3.83317C4.6665 4.06234 4.7481 4.25852 4.9113 4.42171C5.07449 4.58491 5.27067 4.6665 5.49984 4.6665Z"
          fill="var(--justaname-primary-color)" />
      </g>
    </svg>
  )
}