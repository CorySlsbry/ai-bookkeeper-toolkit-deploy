import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-lg shadow-brand-500/20',
        secondary: 'bg-[#1a1a26] text-[#e8e8f0] border border-[#2a2a3d] hover:bg-[#2a2a3d] hover:border-[#3a3a5d]',
        outline: 'border border-[#2a2a3d] text-[#e8e8f0] hover:bg-[#1a1a26] hover:border-brand-500/50',
        ghost: 'text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#1a1a26]',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-11 px-5 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
