import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { sendEmail } from "~/server/mail";

export const emailRouter = createTRPCRouter({
  sendPreviewEmail: protectedProcedure
    .input(
      z.object({
        emailAddress: z.string().email(),
        subject: z.string(),
        htmlContent: z.string(),
        sendFromName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        sendEmail({
          ...input,
          recipients: [input.emailAddress],
          subject: `Preview: ${input.subject}`,
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  sendEmailsToList: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
        htmlContent: z.string(),
        sendFromName: z.string(),
        listId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // get members from list based on id, then use as recipients
      // mark here whether a campaign is sent or not (boolean val in DB)
      try {
        const listUser = await ctx.prisma.list.findUnique({
          where: {
            id: input.listId,
          },
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        });

        if (listUser?.user.id !== ctx.session.user.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to send emails to this list",
          });
        }

        const recipients = await ctx.prisma.list.findMany({
          where: {
            id: input.listId,
          },
          select: {
            contacts: {
              select: {
                email: true,
              },
            },
          },
        });

        if (recipients) {
          const emailArrOfObjs = recipients[0]?.contacts;

          console.log("ACTU", JSON.stringify(recipients));
          const receivers = emailArrOfObjs?.map(
            (item) => item.email
          ) as string[];

          await sendEmail({
            htmlContent: input.htmlContent,
            sendFromName: input.sendFromName,
            subject: input.subject,
            recipients: receivers,
          });

          await ctx.prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              hasSent: true,
            },
          });
        }
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
