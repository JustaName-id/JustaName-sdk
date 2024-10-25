import React from 'react';
import styled from 'styled-components';
import JustSomeone from '../../icons/components/logo/JustSomeone';

interface AvatarWrapperProps {
  $size: number;
  $borderSize?: string;
  $borderColor?: string;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  width: ${(props) => props.$size + 'px'};
  height: ${(props) => props.$size + 'px'};
  min-width: ${(props) => props.$size + 'px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: ${(props) =>
    `${props.$borderSize || '2px'} solid ${
      props.$borderColor || 'var(--justweb3-foreground-color-4)'
    }`};
  box-shadow: 0px 0px ${(props) => (props?.$size > 32 ? '10px' : '5px')} 0px
    rgba(0, 0, 0, 0.25);
  background-color: var(--justweb3-foreground-color-4);
  box-sizing: border-box;
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
  size?: number;
  borderSize?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 32,
  borderSize,
  borderColor,
  style,
}) => {
  return (
    <AvatarWrapper
      $size={size}
      $borderSize={borderSize}
      $borderColor={borderColor}
      style={style}
    >
      {src ? (
        <AvatarImage src={src} alt={alt || 'Avatar'} />
      ) : (
        <JustSomeone width={size} />
      )}
    </AvatarWrapper>
  );
};

export default Avatar;
