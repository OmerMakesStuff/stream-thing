'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useMaybeRoomContext,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { type RemoteParticipant, RoomEvent, Track } from 'livekit-client';
import { useEventListener } from 'usehooks-ts';

import { useStream } from '@/hooks';
import { cn } from '@/lib/utils';

import { StreamFullscreenControl } from './StreamFullscreenControl';
import { StreamInteractionNeeded } from './StreamInteractionNeeded';
import { StreamVolumeControl } from './StreamVolumeControl';

export const StreamLiveVideo = () => {
  const [volume, setVolume] = useState(100),
    [muted, setMuted] = useState(false),
    [isFullscreen, setIsFullscreen] = useState(false),
    [interactionNeeded, setInteractionNeeded] = useState(false);

  const { hostId } = useStream();
  const participant = useRemoteParticipant(hostId) as RemoteParticipant,
    room = useMaybeRoomContext(),
    tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

  useEffect(() => {
    if (!room) return;

    /* By default browsers block audio autoplay until the user interacts
    with the page. In this case display a button to manually play audio. */
    const listener = () => setInteractionNeeded(!room.canPlaybackAudio);
    room.on(RoomEvent.AudioPlaybackStatusChanged, listener);
    return () => {
      room.off(RoomEvent.AudioPlaybackStatusChanged, listener);
    };
  }, [room]);

  const wrapperRef = useRef<HTMLDivElement>(null),
    videoRef = useRef<HTMLVideoElement>(null);

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    if (value > 0) setMuted(false);

    if (!videoRef.current) return;
    videoRef.current.muted = value < 1;
    videoRef.current.volume = value * 0.01;
  }, []);

  const handleMutedChange = useCallback(
    (muted: boolean) => setMuted(muted),
    []
  );

  const handleFullscreenChange = useCallback((value: boolean) => {
    if (!value) document.exitFullscreen();
    else if (wrapperRef.current) wrapperRef.current.requestFullscreen();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    videoRef.current.volume = muted ? 0 : volume * 0.01;
  }, [muted, volume]);

  useEventListener(
    'fullscreenchange',
    () => setIsFullscreen(document.fullscreenElement !== null),
    wrapperRef
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const participantTracks = tracks.filter(
      track => track.participant.identity === participant.identity
    );
    participantTracks.forEach(track => track.publication.track?.attach(video));

    return () => {
      participantTracks.forEach(track =>
        track.publication.track?.detach(video)
      );
    };
  }, [participant.identity, tracks]);

  return (
    <div ref={wrapperRef} className='group relative flex h-full'>
      {interactionNeeded && <StreamInteractionNeeded />}
      <video
        ref={videoRef}
        width='100%'
        className={cn('transition-[filter]', interactionNeeded && 'blur-lg')}
      />
      <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-linear-to-t from-black px-2 opacity-0 transition-opacity group-hover:opacity-100'>
        <StreamVolumeControl
          value={volume}
          onValueChange={handleVolumeChange}
          muted={muted}
          onMutedChange={handleMutedChange}
        />
        <StreamFullscreenControl
          isFullscreen={isFullscreen}
          onFullscreenChange={handleFullscreenChange}
        />
      </div>
    </div>
  );
};
