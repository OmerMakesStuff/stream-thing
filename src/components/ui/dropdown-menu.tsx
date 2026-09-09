'use client';

import type { ComponentProps } from 'react';
import { cn } from 'cn';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

export const DropdownMenu = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
);

export const DropdownMenuPortal = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Portal>) => (
  <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
);

export const DropdownMenuTrigger = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
);

export const DropdownMenuContent = ({
  className,
  children,
  align = 'start',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot='dropdown-menu-content'
      sideOffset={sideOffset}
      align={align}
      className={cn(
        'z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-48 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className
      )}
      {...props}
    >
      <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group'>
        {children}
      </DropdownMenuPrimitive.Group>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuGroup = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Group>) => (
  <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
);

export const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) => (
  <DropdownMenuPrimitive.Item
    data-slot='dropdown-menu-item'
    data-inset={inset}
    data-variant={variant}
    className={cn(
      "group/dropdown-menu-item relative flex cursor-default items-center gap-2.5 rounded-sm px-3 py-2 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
      className
    )}
    {...props}
  />
);

export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    data-slot='dropdown-menu-checkbox-item'
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 pr-8 pl-3 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    checked={checked}
    {...props}
  >
    <span
      className='pointer-events-none absolute right-2 flex items-center justify-center'
      data-slot='dropdown-menu-checkbox-item-indicator'
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

export const DropdownMenuRadioGroup = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => (
  <DropdownMenuPrimitive.RadioGroup
    data-slot='dropdown-menu-radio-group'
    {...props}
  />
);

export const DropdownMenuRadioItem = ({
  className,
  children,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.RadioItem
    data-slot='dropdown-menu-radio-item'
    data-inset={inset}
    className={cn(
      "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 pr-8 pl-3 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <span
      className='pointer-events-none absolute right-2 flex items-center justify-center'
      data-slot='dropdown-menu-radio-item-indicator'
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Label
    data-slot='dropdown-menu-label'
    data-inset={inset}
    className={cn(
      'px-3 py-2.5 text-xs text-muted-foreground data-inset:pl-9.5',
      className
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    data-slot='dropdown-menu-separator'
    className={cn('-mx-1.5 my-1.5 h-px bg-border/50', className)}
    {...props}
  />
);

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    data-slot='dropdown-menu-shortcut'
    className={cn(
      'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
      className
    )}
    {...props}
  />
);

export const DropdownMenuSub = ({
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Sub>) => (
  <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
);

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    data-slot='dropdown-menu-sub-trigger'
    data-inset={inset}
    className={cn(
      "flex cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='ml-auto' />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    data-slot='dropdown-menu-sub-content'
    className={cn(
      'z-50 min-w-36 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
      className
    )}
    {...props}
  />
);
