import React from 'react';
import styled from 'styled-components';
import JustSomeone from '../../icons/components/logo/JustSomeone';

interface AvatarWrapperProps {
  $size?: string;
  $bgColor?: string;
  $borderColor?: string;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
    width: ${props => props.$size || '40px'};
    height: ${props => props.$size || '40px'};
    min-width: ${props => props.$size || '40px'};
    background-color:  ${(props) => props.$bgColor || 'var(--justaname-primary-color)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid ${(props) => props.$borderColor || 'var(--justaname-primary-color)'};
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
  bgColor?: string;
  borderColor?: string;
  loading?: boolean;
  color?: string;
  fontSize?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
                                         src,
                                         alt,
                                         initial,
                                         size,
                                         bgColor,
                                                borderColor,
                                                color,
                                         fontSize
                                       }) => {
  return (
    <AvatarWrapper $size={size} $bgColor={bgColor} $borderColor={borderColor}>
      {
        src ? (
        <AvatarImage src={src} alt={alt || 'Avatar'} />
      ) : <JustSomeone width={28} />
      }
    </AvatarWrapper>
  );
};

export default Avatar;