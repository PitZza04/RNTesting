import {z} from 'zod';

export const schema = z.object({
  latLng: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),

  invites: z.object({
    copiedInvites: z.array(z.string()),
  }),
});
export type Schema = z.infer<typeof schema>;

export const defaults: Schema = {
  latLng: undefined,
  invites: {
    copiedInvites: ['Hello World'],
  },
};
