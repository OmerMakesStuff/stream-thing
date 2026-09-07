'use client';

import { type SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';

import { Link } from '@/components/ui/Link';
import { SpinnerButton } from '@/components/ui/SpinnerButton';
import {
  AuthContent,
  AuthError,
  AuthField,
  AuthFooter,
  AuthGithubButton,
  AuthHeader,
  AuthSeparator,
} from '@/components/layout/Auth';
import { createPostAuthNavigation, getSsoRedirectUrls } from '@/lib/auth';
import { SIGN_UP_URL } from '@/constants/clerk';

const SignInPage = () => {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const [step, setStep] = useState<'identifier' | 'password'>('identifier'),
    [identifier, setIdentifier] = useState(''),
    [flowError, setFlowError] = useState<string>();
  const isLoading = fetchStatus === 'fetching';
  const navigate = createPostAuthNavigation(router.push);

  const handleIdentifier = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFlowError(undefined);

    const { error } = await signIn.create({ identifier });
    if (error) return;

    if (signIn.status === 'complete') return signIn.finalize({ navigate });
    if (
      signIn.status === 'needs_first_factor' &&
      signIn.supportedFirstFactors.some(
        ({ strategy }) => strategy === 'password'
      )
    )
      return setStep('password');

    setFlowError('This account requires an unsupported sign-in method.');
  };

  const handlePassword = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFlowError(undefined);

    const form = new FormData(event.currentTarget);
    const { error } = await signIn.password({
      password: String(form.get('password')),
    });
    if (error) return;

    if (signIn.status === 'complete') return signIn.finalize({ navigate });
    if (
      signIn.status === 'needs_second_factor' ||
      signIn.status === 'needs_client_trust'
    )
      return setFlowError('Additional account verification is required.');
    setFlowError('The sign-in attempt could not be completed.');
  };

  const handleGithub = async () => {
    setFlowError(undefined);
    const { error } = await signIn.sso({
      strategy: 'oauth_github',
      ...getSsoRedirectUrls(),
    });
    if (error) setFlowError(error.message);
  };

  const handleReset = async () => {
    setFlowError(undefined);
    await signIn.reset();
    setStep('identifier');
  };

  const globalError = flowError ?? errors.global?.[0]?.message;
  const isPasswordStep = step === 'password';

  return (
    <>
      <AuthHeader
        title={isPasswordStep ? `Hi, ${identifier}!` : 'Welcome back!'}
        description={
          isPasswordStep
            ? 'Enter your password here to sign in.'
            : 'Sign in to continue to Stream Thing.'
        }
      />
      <AuthContent>
        {!isPasswordStep && (
          <>
            <AuthGithubButton
              action='Sign in'
              isLoading={isLoading}
              onClick={handleGithub}
            />
            <AuthSeparator>or</AuthSeparator>
          </>
        )}
        <form
          key={step}
          onSubmit={isPasswordStep ? handlePassword : handleIdentifier}
          className='space-y-2'
        >
          {isPasswordStep ? (
            <AuthField
              id='password'
              name='password'
              label='Password'
              type='password'
              autoComplete='current-password'
              error={errors.fields.password?.message}
              required
              disabled={isLoading}
              autoFocus
            />
          ) : (
            <AuthField
              id='identifier'
              name='identifier'
              label='Username'
              value={identifier}
              onChange={event => setIdentifier(event.target.value)}
              autoComplete='username'
              error={errors.fields.identifier?.message}
              required
              disabled={isLoading}
              autoFocus
            />
          )}
          <AuthError>{globalError}</AuthError>
          <SpinnerButton
            type='submit'
            variant='primary'
            showSpinner={isLoading}
            disabled={isLoading}
            className='mt-4 w-full'
          >
            {isPasswordStep ? 'Sign in' : 'Continue'}
          </SpinnerButton>
        </form>
      </AuthContent>
      <AuthFooter>
        {isPasswordStep ? (
          <button
            type='button'
            onClick={handleReset}
            className='rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
          >
            Change user
          </button>
        ) : (
          <>
            Don&apos;t have an account? <Link href={SIGN_UP_URL}>Sign up</Link>
          </>
        )}
      </AuthFooter>
    </>
  );
};

export default SignInPage;
