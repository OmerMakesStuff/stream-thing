import type { ComponentProps } from 'react';
import { cn } from 'cn';
import { Slot } from 'radix-ui';

export type CardProps = ComponentProps<'div'> & {
  asChild?: boolean;
  size?: 'default' | 'sm';
};

export const Card = ({
  className,
  size = 'default',
  asChild = false,
  ...props
}: CardProps) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot='card'
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground shadow-md ring-1 ring-foreground/5 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] dark:ring-foreground/10 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='card-header'
    className={cn(
      'group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
      className
    )}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='card-title'
    className={cn('text-base font-medium', className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot='card-description'
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='card-action'
    className={cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='card-content'
    className={cn('px-(--card-spacing)', className)}
    {...props}
  />
);

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='card-footer'
    className={cn(
      'flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)',
      className
    )}
    {...props}
  />
);
