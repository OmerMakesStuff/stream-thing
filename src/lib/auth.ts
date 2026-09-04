import { SSO_CALLBACK_URL } from '@/constants/clerk';

type ClerkNavigation = { decorateUrl: (url: string) => string };

export const getPostAuthUrl = () =>
  new URLSearchParams(window.location.search).get('redirect_url') ?? '/';

export const withPostAuthUrl = (path: string, redirectUrl = getPostAuthUrl()) =>
  `${path}?${new URLSearchParams({ redirect_url: redirectUrl })}`;

export const createPostAuthNavigation =
  (push: (url: string) => void) =>
  ({ decorateUrl }: ClerkNavigation) => {
    const url = decorateUrl(getPostAuthUrl());
    if (url.startsWith('http')) window.location.href = url;
    else push(url);
  };

export const getSsoRedirectUrls = () => {
  const redirectUrl = getPostAuthUrl();
  return {
    redirectCallbackUrl: withPostAuthUrl(SSO_CALLBACK_URL, redirectUrl),
    redirectUrl,
  };
};
