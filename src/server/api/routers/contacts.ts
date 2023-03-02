import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const contactsRouter = createTRPCRouter({
  removeContactsFromList: protectedProcedure
    .input(z.object({ listId: z.string(), contactId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.contact.update({
          where: {
            id: input.contactId,
          },
          data: {
            lists: {
              disconnect: {
                id: input.listId,
              },
            },
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
