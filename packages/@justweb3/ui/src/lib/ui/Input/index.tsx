import React from 'react';
import styles from './Input.module.css'; // Import CSS module

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, left, error, right, fullWidth, style, ...props }, ref) => {
    const wrapperClassNames = [
      styles.inputWrapper,
      error ? styles.inputWrapperError : '',
      fullWidth ? styles.inputWrapperFullWidth : '',
      className || '',
    ].join(' ');

    return (
      <div className={wrapperClassNames} style={style}>
        {left && <div className={styles.leftElement}>{left}</div>}
        <input ref={ref} className={styles.styledInput} {...props} />
        {right && <div className={styles.rightElement}>{right}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
