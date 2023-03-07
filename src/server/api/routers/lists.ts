import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const listsRouter = createTRPCRouter({
  getListsAndContactsCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.list.findMany({
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
  getLists: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.list.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (err) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createList: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.name || input.name === "") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Name is required",
        });
      }
      try {
        return await ctx.prisma.list.create({
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
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.list.deleteMany({
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
    .query(async ({ ctx, input }) => {
      if (!input) return null;
      try {
        return await ctx.prisma.list.findUnique({
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
  editListName: protectedProcedure
    .input(z.object({ listId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.name || input.name === "")
        throw new TRPCError({ code: "BAD_REQUEST" });
      try {
        return await ctx.prisma.list.update({
          where: {
            id: input.listId,
          },
          data: {
            name: input.name,
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getListsCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.list.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (err) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
