import { generateReactHelpers } from '@uploadthing/react';

import type { ThumbnailFileRouter } from '@/lib/uploadthing';

export const { useUploadThing } = generateReactHelpers<ThumbnailFileRouter>();
