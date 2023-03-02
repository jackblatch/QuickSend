import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const contactsRouter = createTRPCRouter({
  removeContactFromList: protectedProcedure
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
  removeMultipleContactsFromList: protectedProcedure
    .input(z.object({ listId: z.string(), contactIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return Promise.all(
          input.contactIds.map(async (id) => {
            await ctx.prisma.contact.update({
              where: {
                id: id,
              },
              data: {
                lists: {
                  disconnect: {
                    id: input.listId,
                  },
                },
              },
            });
          })
        );
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  addContactToList: protectedProcedure
    .input(z.object({ listId: z.string(), email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const contact = await ctx.prisma.contact.findFirst({
          where: {
            email: input.email,
          },
        });
        console.log("CONTACT", contact);
        if (contact) {
          return ctx.prisma.contact.update({
            where: {
              id: contact.id,
            },
            data: {
              lists: {
                connect: {
                  id: input.listId,
                },
              },
            },
          });
        } else {
          return ctx.prisma.contact.create({
            data: {
              email: input.email,
              lists: {
                connect: {
                  id: input.listId,
                },
              },
            },
          });
        }
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
