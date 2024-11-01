import React from 'react';
import styles from './Text.module.css';
import clsx from 'clsx';

export const H2: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
> = ({ children, className, ...props }) => (
  <h2 className={clsx(className, styles.h2)} {...props}>
    {children}
  </h2>
);
export const P: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
> = ({ children, className, ...props }) => (
  <p className={clsx(styles.p, className)} {...props}>
    {children}
  </p>
);

export const A: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ children, className, ...props }) => (
  <a className={clsx(className, styles.a)} {...props}>
    {children}
  </a>
);

export const SPAN: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> = ({ children, className, ...props }) => (
  <span className={clsx(className, styles.span)} {...props}>
    {children}
  </span>
);

export default { H2, P, A, SPAN };
