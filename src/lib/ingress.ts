import {
  type CreateIngressOptions,
  IngressClient,
  IngressInput,
  RoomServiceClient,
} from 'livekit-server-sdk';

const createLiveKitClients = () => {
  const host = process.env.LIVEKIT_API_URL,
    apiKey = process.env.LIVEKIT_API_KEY,
    apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!host || !apiKey || !apiSecret) {
    throw new Error('LiveKit server credentials are not configured');
  }

  return {
    ingressClient: new IngressClient(host, apiKey, apiSecret),
    roomService: new RoomServiceClient(host, apiKey, apiSecret),
  };
};

export const createIngress = async (
  inputType: IngressInput,
  options: CreateIngressOptions
) => {
  const { ingressClient } = createLiveKitClients();
  const ingress = await ingressClient.createIngress(inputType, options);
  if (!ingress || !ingress.url || !ingress.streamKey)
    throw new Error('Failed to create ingress.');
  return ingress;
};

export const resetIngresses = async (hostId: string) => {
  const { ingressClient, roomService } = createLiveKitClients();
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
