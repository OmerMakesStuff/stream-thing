import { useEffect, useState, useTransition } from 'react';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { toast } from 'sonner';

import { createViewerToken } from '@/actions/token';

export const useViewerToken = (hostId: string) => {
  const [token, setToken] = useState(''),
    [name, setName] = useState(''),
    [identity, setIdentity] = useState(''),
    [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

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
        toast.error("Couldn't create token", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while creating your user token.',
        });
      }
    });
  }, [hostId]);

  return {
    token,
    name,
    identity,
    isTokenPending: isPending || (!token && !error),
  };
};
