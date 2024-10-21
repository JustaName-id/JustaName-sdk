import React from 'react';
import styled from 'styled-components';
import JustSomeone from '../../icons/components/logo/JustSomeone';

interface AvatarWrapperProps {
  $size?: string;
  $border?: boolean;
  $bgColor?: string;
  $borderColor?: string;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  width: ${(props) => props.$size || '40px'};
  height: ${(props) => props.$size || '40px'};
  min-width: ${(props) => props.$size || '40px'};
  background-color: ${(props) =>
    props.$bgColor || 'var(--justweb3-primary-color)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${(props) =>
    props.$border
      ? `1px solid  ${props.$borderColor || 'var(--justweb3-primary-color)'}`
      : 'none'};
`;

const AvatarImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

// interface AvatarInitialProps {
//   fontSize?: string;
//   color?: string;
// }

// const AvatarInitial = styled(P)<AvatarInitialProps>`
//     font-size: ${props => props.fontSize || '16px'};
//     color: ${props => props.color || '#ffffff'};
//     font-weight: bold;
// `;

interface AvatarProps {
  src?: string;
  alt?: string;
  initial?: string;
  size?: string;
  border?: boolean;
  bgColor?: string;
  borderColor?: string;
  loading?: boolean;
  color?: string;
  fontSize?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initial,
  size,
  bgColor,
  border = true,
  borderColor,
  color,
  fontSize,
  style,
  containerStyle,
}) => {
  return (
    <AvatarWrapper
      $size={size}
      $bgColor={bgColor}
      $border={border}
      $borderColor={borderColor}
      style={containerStyle}
    >
      {src ? (
        <AvatarImage src={src} alt={alt || 'Avatar'} style={style} />
      ) : (
        <JustSomeone width={28} />
      )}
    </AvatarWrapper>
  );
};

export default Avatar;
