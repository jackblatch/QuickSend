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
        if (contact) {
          return await ctx.prisma.contact.update({
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
          return await ctx.prisma.contact.create({
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
  addMultipleContactsToList: protectedProcedure
    .input(
      z.object({ emails: z.array(z.string().email()), listId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      try {
        return Promise.all(
          input.emails.map(async (email) => {
            const contact = await ctx.prisma.contact.findFirst({
              where: {
                email: email,
              },
            });
            if (contact) {
              return await ctx.prisma.contact.update({
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
              return await ctx.prisma.contact.create({
                data: {
                  email: email,
                  lists: {
                    connect: {
                      id: input.listId,
                    },
                  },
                },
              });
            }
          })
        );
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
