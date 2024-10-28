'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const inputStyles = cva(
    "relative font-poppins font-medium rounded-[6px] flex w-full  bg-white px-4 py-2.5 text-base  flex items-center rounded-[6px] border border-black justify-center w-full h-full ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary focus-visible:outline-none focus-visible:border-primary  disabled:cursor-not-allowed disabled:opacity-50  focus-visible:ring-offset-0 dark:placeholder:text-primary ",
    {
        variants: {
            hasLeftIcon: {
                true: "pl-[50px]",
                false: "",
            },
            hasRightIconOrPassword: {
                true: "pr-[50px]",
                false: "",
            }
        }
    }
);


interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyles> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    iconSize?: number;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    leftIcon,
    rightIcon,
    iconSize,
    containerClassName,
    ...props
}, ref) => {

    const hasLeftIcon = !!leftIcon;
    const hasRightIconOrPassword = !!rightIcon || type === "password";

    return (
        <div className={`relative ${containerClassName}`}>
            {leftIcon && (
                <div className={cn("absolute z-10 top-1/2 transform -translate-y-1/2 left-0 flex items-center justify-center text-primary", `${iconSize ? `h-[${iconSize}px] w-[${iconSize}px]` : "h-full aspect-square"}`)}>
                    {leftIcon}
                </div>
            )}
            <input
                className={cn(inputStyles({ hasLeftIcon, hasRightIconOrPassword }), className)}
                type={type}
                ref={ref}
                {...props}
            />
            {rightIcon && (
                <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center justify-center h-full pr-[10px] text-primary">
                    {rightIcon}
                </div>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };

