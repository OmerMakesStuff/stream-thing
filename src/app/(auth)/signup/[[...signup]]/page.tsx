'use client';

import { type SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';

import { Link } from '@/components/ui/link';
import { SpinnerButton } from '@/components/ui/spinner-button';
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
import { SIGN_IN_URL } from '@/constants/clerk';

const SignUpPage = () => {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const [flowError, setFlowError] = useState<string>();
  const isLoading = fetchStatus === 'fetching';
  const navigate = createPostAuthNavigation(router.push);
  const isSsoContinuation =
    !!signUp.id &&
    signUp.status === 'missing_requirements' &&
    signUp.missingFields.includes('username') &&
    !signUp.hasPassword;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFlowError(undefined);
    const form = new FormData(event.currentTarget);
    const username = String(form.get('username'));

    const { error } = isSsoContinuation
      ? await signUp.update({ username })
      : await signUp.password({
          username,
          password: String(form.get('password')),
        });
    if (error) return;

    if (signUp.status === 'complete') return signUp.finalize({ navigate });

    setFlowError(
      signUp.missingFields.length
        ? `More information is required: ${signUp.missingFields.join(', ')}.`
        : 'The sign-up attempt could not be completed.'
    );
  };

  const handleGithub = async () => {
    setFlowError(undefined);
    const { error } = await signUp.sso({
      strategy: 'oauth_github',
      ...getSsoRedirectUrls(),
    });
    if (error) setFlowError(error.message);
  };

  const globalError = flowError ?? errors.global?.[0]?.message;

  return (
    <>
      <AuthHeader
        title={isSsoContinuation ? 'Choose a username' : "Let's get started"}
        description={
          isSsoContinuation
            ? 'Complete your account to continue to Stream Thing.'
            : 'Fill in the details to create your account.'
        }
      />
      <AuthContent>
        {!isSsoContinuation && (
          <>
            <AuthGithubButton
              action='Sign up'
              isLoading={isLoading}
              onClick={handleGithub}
            />
            <AuthSeparator>or</AuthSeparator>
          </>
        )}
        <form onSubmit={handleSubmit} className='space-y-2'>
          <AuthField
            id='username'
            name='username'
            label='Username'
            autoComplete='username'
            error={errors.fields.username?.message}
            required
            disabled={isLoading}
            autoFocus
          />
          {!isSsoContinuation && (
            <AuthField
              id='password'
              name='password'
              label='Password'
              type='password'
              autoComplete='new-password'
              error={errors.fields.password?.message}
              required
              disabled={isLoading}
            />
          )}
          <div id='clerk-captcha' />
          <AuthError>{errors.fields.captcha?.message}</AuthError>
          <AuthError>{globalError}</AuthError>
          <SpinnerButton
            type='submit'
            variant='primary'
            showSpinner={isLoading}
            disabled={isLoading}
            className='mt-4 w-full'
          >
            Sign up
          </SpinnerButton>
        </form>
      </AuthContent>
      <AuthFooter>
        Already have an account? <Link href={SIGN_IN_URL}>Sign in</Link>
      </AuthFooter>
    </>
  );
};

export default SignUpPage;
