import { WifiOffIcon } from 'lucide-react';

export type StreamOfflineStateProps = { username?: string };

export const StreamOfflineState = ({ username }: StreamOfflineStateProps) => (
  <div className='flex h-full flex-col items-center justify-center gap-4 text-white/55'>
    <WifiOffIcon className='h-10 w-10' />
    <p>{username ? `${username} is offline` : 'Offline'}</p>
  </div>
);
