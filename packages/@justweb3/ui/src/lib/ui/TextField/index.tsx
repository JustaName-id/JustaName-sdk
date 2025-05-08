import React from 'react';
import styles from './TextField.module.css';

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  fullWidth?: boolean;
  resizable?: boolean;
}

export const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ className, error, fullWidth, style: wrapperStyle, resizable, ...otherProps }, ref) => {
    const htmlProps = otherProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

    const wrapperClassNames = [
      styles.inputWrapper,
      error ? styles.inputWrapperError : '',
      fullWidth ? styles.inputWrapperFullWidth : '',
      className || '',
    ].join(' ');

    const textareaFinalStyle = {
      ...(htmlProps.style || {}),
      resize: resizable === false ? 'none' : (resizable === true || resizable === undefined) ? 'both' : resizable,
    } as React.CSSProperties;

    return (
      <div className={wrapperClassNames} style={wrapperStyle}>
        <textarea
          ref={ref}
          className={styles.styledInput}
          {...htmlProps}
          style={textareaFinalStyle}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';
export default TextField;
