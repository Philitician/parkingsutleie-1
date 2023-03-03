import { z } from "zod";

export const createParkingSpaceSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.coerce.number().min(0),
  address: z.string().min(1).max(255),
  latitude: z.number(),
  longitude: z.number(),
});

export type CreateParkingSpace = z.infer<typeof createParkingSpaceSchema>;
