import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const listsRouter = createTRPCRouter({
  getLists: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.list.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          _count: {
            select: {
              contacts: true,
            },
          },
        },
      });
    } catch (err) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createList: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      if (!input.name || input.name === "") {
        console.log("error");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Name is required",
        });
      }
      try {
        return ctx.prisma.list.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  deleteLists: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      try {
        return ctx.prisma.list.deleteMany({
          where: {
            id: {
              in: input,
            },
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getListInfo: protectedProcedure
    .input(z.string().nullish())
    .query(({ ctx, input }) => {
      if (!input) return null;
      try {
        return ctx.prisma.list.findUnique({
          where: {
            id: input,
          },
          select: {
            name: true,
            contacts: {
              select: {
                id: true,
                email: true,
                createdAt: true,
              },
            },
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
