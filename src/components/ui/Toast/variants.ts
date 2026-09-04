import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  `group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg p-4 pr-8 shadow-lg transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none`,
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'destructive group bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);
