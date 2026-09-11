import type { PropsWithChildren } from 'react';

import { Card } from '@/components/ui/card';

export const SettingsCard = ({ children }: PropsWithChildren) => (
  <Card className='flex w-full flex-col gap-px px-4' asChild>
    <ul>{children}</ul>
  </Card>
);
