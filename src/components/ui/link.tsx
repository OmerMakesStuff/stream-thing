import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { cn } from 'cn';

export const Link = ({
  href,
  className,
  children,
  ref,
  ...props
}: ComponentProps<typeof NextLink>) => (
  <NextLink
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
  </NextLink>
);
