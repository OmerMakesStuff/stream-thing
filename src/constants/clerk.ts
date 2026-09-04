import type { NextClerkProviderProps } from '@clerk/nextjs/types';

import { buttonVariants } from '@/components/ui/Button';

type Appearance = NonNullable<NextClerkProviderProps['appearance']>;

export const SIGN_IN_URL = '/signin',
  SIGN_UP_URL = '/signup',
  SSO_CALLBACK_URL = '/sso-callback';

export const clerkTheme = {
  elements: {
    cardBox: 'bg-transparent text-popover-foreground border-none shadow-none',
    formFieldLabel: 'text-muted-foreground',
    formFieldInput: 'bg-background text-inherit',
    formButtonPrimary: buttonVariants({ variant: 'primary' }),
    footer: 'bg-none',
  },
} satisfies Appearance;
