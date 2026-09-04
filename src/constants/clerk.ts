import type { NextClerkProviderProps } from '@clerk/nextjs/types';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Appearance = NonNullable<NextClerkProviderProps['appearance']>;

export const SIGN_IN_URL = '/signin',
  SIGN_UP_URL = '/signup',
  SSO_CALLBACK_URL = '/sso-callback';

export const clerkTheme = (
  ['signIn', 'signUp'] satisfies (keyof Appearance)[]
).reduce<Appearance>(
  (obj, curr) => ({
    ...obj,
    [curr]: {
      elements: {
        rootBox: 'bg-transparent shadow-none',
        card: 'bg-transparent shadow-none py-0 w-full',
        headerTitle:
          'text-2xl text-center font-bold tracking-tight text-foreground',
        headerSubtitle: 'hidden',
        footer: '[&>:last-child]:hidden',
      },
    },
  }),
  {
    elements: {
      cardBox: 'bg-transparent text-popover-foreground border-none shadow-none',
      userPreviewSecondaryIdentifier: 'text-muted-foreground',
      userButtonPopoverActionButtonText: 'text-card-foreground',
      userButtonPopoverActionButtonIcon: 'text-muted-foreground',
      userButtonPopoverFooter: 'hidden',
      socialButtonsBlockButton: cn(buttonVariants({ variant: 'default' })),
      socialButtonsBlockButtonText: 'text-foreground',
      formFieldLabel: 'text-muted-foreground',
      formFieldInput: 'bg-background text-inherit',
      formButtonPrimary: cn(buttonVariants({ variant: 'primary' })),
      footer: 'bg-none',
      footerActionText: 'text-foreground',
      footerActionLink: 'text-primary font-medium hover:text-primary',
    },
    userProfile: { elements: { card: 'bg-background' } },
  }
);
