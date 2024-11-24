import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from './Label.module.css';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    required?: boolean;
  }
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`${styles.label} ${required ? styles.required : ''} ${
      className || ''
    }`}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
