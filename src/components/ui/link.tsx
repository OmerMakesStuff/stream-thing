import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

export type LinkProps = ComponentProps<typeof NextLink> & {
  asChild?: boolean;
};

export const Link = ({
  href,
  asChild = false,
  className,
  children,
  ref,
  ...props
}: LinkProps) => {
  const Comp = asChild ? Slot.Root : NextLink;

  return (
    <Comp
      {...props}
      ref={ref}
      href={href}
      data-slot='link'
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap text-primary underline-offset-4 transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      {children}
    </Comp>
  );
};
