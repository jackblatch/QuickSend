import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  getCampaigns: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.campaign.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          subject: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (err) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
