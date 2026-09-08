import { useEffect, useState, useTransition } from 'react';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

import { createViewerToken } from '@/actions/token';

import { useToast } from './useToast';

export const useViewerToken = (hostId: string) => {
  const [token, setToken] = useState(''),
    [name, setName] = useState(''),
    [identity, setIdentity] = useState(''),
    [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  useEffect(() => {
    startTransition(async () => {
      try {
        const viewerToken = await createViewerToken(hostId);
        setToken(viewerToken);

        const { name, sub } = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        if (sub) setIdentity(sub);
        if (name) setName(name);
      } catch (err) {
        setError(true);
        displayToast("Couldn't create token", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while creating your user token.',
        });
      }
    });
  }, [displayToast, hostId]);

  return {
    token,
    name,
    identity,
    isTokenPending: isPending || (!token && !error),
  };
};
