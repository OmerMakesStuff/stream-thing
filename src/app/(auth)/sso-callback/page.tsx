'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs';

import { Spinner } from '@/components/ui/spinner';
import {
  createPostAuthNavigation,
  getPostAuthUrl,
  withPostAuthUrl,
} from '@/lib/auth';
import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/clerk';

const SsoCallbackPage = () => {
  const clerk = useClerk();
  const { signIn } = useSignIn(),
    { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!clerk.loaded || hasRun.current) return;
    hasRun.current = true;

    const postAuthUrl = getPostAuthUrl();
    const navigate = createPostAuthNavigation(router.push);

    const finish = async () => {
      if (signIn.status === 'complete') {
        await signIn.finalize({ navigate });
        return;
      }

      if (signUp.isTransferable) {
        const { error } = await signIn.create({ transfer: true });
        if (error) throw error;
        const signInStatus = signIn.status as typeof signIn.status | 'complete';
        if (signInStatus === 'complete') {
          await signIn.finalize({ navigate });
          return;
        }
        router.replace(withPostAuthUrl(SIGN_IN_URL, postAuthUrl));
        return;
      }

      if (
        signIn.status === 'needs_first_factor' &&
        !signIn.supportedFirstFactors.every(
          ({ strategy }) => strategy === 'enterprise_sso'
        )
      )
        return router.replace(withPostAuthUrl(SIGN_IN_URL, postAuthUrl));

      if (signIn.isTransferable) {
        const { error } = await signUp.create({ transfer: true });
        if (error) throw error;
        if (signUp.status === 'complete') {
          await signUp.finalize({ navigate });
          return;
        }
        return router.replace(withPostAuthUrl(SIGN_UP_URL, postAuthUrl));
      }

      if (signUp.status === 'complete') {
        await signUp.finalize({ navigate });
        return;
      }
      if (signIn.status === 'needs_second_factor')
        return router.replace(withPostAuthUrl(SIGN_IN_URL, postAuthUrl));

      const sessionId =
        signIn.existingSession?.sessionId ?? signUp.existingSession?.sessionId;
      if (sessionId)
        return await clerk.setActive({ session: sessionId, navigate });

      throw new Error(
        'The GitHub authentication attempt could not be completed.'
      );
    };

    void finish().catch(error => {
      setError(
        error instanceof Error
          ? error.message
          : 'The GitHub authentication attempt could not be completed.'
      );
    });
  }, [clerk, router, signIn, signUp]);

  return error ? (
    <p className='text-center text-sm text-destructive' role='alert'>
      {error}
    </p>
  ) : (
    <Spinner className='mx-auto size-8' />
  );
};

export default SsoCallbackPage;
