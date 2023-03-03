import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createParkingSpaceSchema } from "~/validation/parkingSpacesValidation";
import getDistance from "geolib/es/getDistance";

export const parkingSpacesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const parkingSpaces = await ctx.prisma.parkingSpace.findMany();
    console.log(parkingSpaces);
    return parkingSpaces;
  }),
  getAllWithDistance: publicProcedure
    .input(z.object({ latitude: z.number(), longitude: z.number() }))
    .query(async ({ input, ctx }) => {
      const parkingSpaces = await ctx.prisma.parkingSpace.findMany();
      const parkingSpacesWithDistance = parkingSpaces.map((parkingSpace) => {
        const distance = getDistance(
          input,
          {
            latitude: parkingSpace.latitude,
            longitude: parkingSpace.longitude,
          },
          1
        );

        return {
          ...parkingSpace,
          distance: distance >= 1000 ? distance / 1000 + "km" : distance + "m",
        };
      });
      return parkingSpacesWithDistance;
    }),

  registerParkingSpace: protectedProcedure
    .input(createParkingSpaceSchema)
    .mutation(async ({ input, ctx }) => {
      const parkingSpace = await ctx.prisma.parkingSpace.create({
        data: {
          name: input.name,
          address: input.address,
          latitude: input.latitude,
          longitude: input.longitude,
          price: input.price,
          owner: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return parkingSpace;
    }),
});
