import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

import { getCurrentUser } from '@/queries/auth';

const uploadThing = createUploadthing();

export const fileRouter = {
  thumbnailUploader: uploadThing({
    'image/png': { maxFileSize: '4MB', maxFileCount: 1 },
    'image/jpeg': { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      await getCurrentUser({ throwIfNotFound: true });
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;
export type ThumbnailFileRouter = typeof fileRouter;

export const uploadThingApi = new UTApi();
