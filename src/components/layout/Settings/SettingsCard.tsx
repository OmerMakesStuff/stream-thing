import type { PropsWithChildren } from 'react';

import { Card } from '@/components/ui/card';

export const SettingsCard = ({ children }: PropsWithChildren) => (
  <Card className='w-full px-4'>
    <ul className='flex flex-col gap-px'>{children}</ul>
  </Card>
);
