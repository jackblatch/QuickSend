import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const campaignsRouter = createTRPCRouter({
  getCampaigns: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.campaign.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          id: true,
          name: true,
          subject: true,
          createdAt: true,
          updatedAt: true,
          list: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (err) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createCampaign: protectedProcedure
    .input(
      z.object({
        campaignName: z.string(),
        emailSubject: z.string(),
        fromName: z.string(),
        listId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.campaign.create({
          data: {
            name: input.campaignName,
            subject: input.emailSubject,
            sendFromName: input.fromName,
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getCampaignInfo: protectedProcedure
    .input(z.object({ campaignId: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      if (!input.campaignId) return null;
      try {
        return await ctx.prisma.campaign.findUnique({
          where: {
            id: input.campaignId,
          },
          select: {
            id: true,
            name: true,
            subject: true,
            sendFromName: true,
            createdAt: true,
            updatedAt: true,
            list: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  updateCampaign: protectedProcedure
    .input(
      z.object({
        campaignId: z.string(),
        emailSubject: z.string(),
        sendFromName: z.string(),
        listId: z.string(),
        campaignName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const isUserAuthorisedToEditCampaign = async () => {
          const campaign = await ctx.prisma.campaign.findUnique({
            where: {
              id: input.campaignId,
            },
          });
          if (campaign?.userId !== ctx.session.user.id) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
          } else {
            return true;
          }
        };
        await isUserAuthorisedToEditCampaign();
        return await ctx.prisma.campaign.update({
          where: {
            id: input.campaignId,
          },
          data: {
            name: input.campaignName,
            subject: input.emailSubject,
            sendFromName: input.sendFromName,
            list: {
              connect: {
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
