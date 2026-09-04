'use client';

import { ConnectionState, Track } from 'livekit-client';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';

import { StreamDisconnectedState } from './StreamDisconnectedState';
import { StreamLiveVideo } from './StreamLiveVideo';
import { StreamLoadingState } from './StreamLoadingState';
import { StreamOfflineState } from './StreamOfflineState';
import { useStream } from '@/hooks';
import { Skeleton } from '@/components/ui/Skeleton';

export const StreamVideo = () => {
  const { hostId, hostName } = useStream();
  const connectionState = useConnectionState(),
    participant = useRemoteParticipant(hostId),
    tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
      track => track.participant.identity === hostId
    );

  return (
    <div className='group relative aspect-video overflow-hidden rounded-lg border bg-black text-white'>
      {!participant && connectionState === ConnectionState.Connected ? (
        <StreamOfflineState username={hostName} />
      ) : connectionState === ConnectionState.Disconnected ? (
        <StreamDisconnectedState />
      ) : !participant || tracks.length < 1 ? (
        <StreamLoadingState />
      ) : (
        <StreamLiveVideo />
      )}
    </div>
  );
};

export const StreamVideoSkeleton = () => (
  <Skeleton className='aspect-video rounded-lg' />
);
