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
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
