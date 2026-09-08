import {
  type CreateIngressOptions,
  IngressClient,
  IngressInput,
  RoomServiceClient,
} from 'livekit-server-sdk';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL as string);

export const createIngress = async (
  inputType: IngressInput,
  options?: CreateIngressOptions
) => {
  const ingress = await ingressClient.createIngress(inputType, options);
  if (!ingress || !ingress.url || !ingress.streamKey)
    throw new Error('Failed to create ingress.');
  return ingress;
};

export const resetIngresses = async (hostId: string) => {
  const ingresses = await ingressClient.listIngress({ roomName: hostId }),
    rooms = await roomService.listRooms([hostId]);

  await Promise.allSettled(
    rooms.map(async room => await roomService.deleteRoom(room.name))
  );
  await Promise.allSettled(
    ingresses.map(
      async ingress =>
        ingress.ingressId &&
        (await ingressClient.deleteIngress(ingress.ingressId))
    )
  );
};
