import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { GithubIcon } from '@/components/icons/GithubIcon';

type AuthGithubButtonProps = {
  action: 'Sign in' | 'Sign up';
  isLoading: boolean;
  onClick: () => Promise<void>;
};

export const AuthGithubButton = ({
  action,
  isLoading,
  onClick,
}: AuthGithubButtonProps) => (
  <Button
    type='button'
    onClick={onClick}
    disabled={isLoading}
    className='w-full'
  >
    {isLoading ? (
      <Spinner className='me-2 size-4' />
    ) : (
      <GithubIcon className='me-2 size-4' />
    )}
    {action} with GitHub
  </Button>
);
