import { parseAndGenerateBlocks } from "~/campaignEditor/utils/campaignEditorUtils";
import type { NextApiRequest, NextApiResponse } from "next";
import renderToHtml from "~/campaignEditor/utils/renderToHtml";
import { prisma } from "~/server/db";
import { sendEmail } from "~/server/mail";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.key !== process.env.QUERY_PARAM_KEY) {
    res.status(404).end();
    return;
  }

  const checkForEmailsToBeSent = async () => {
    const campaignsToSend = await prisma.campaign.findMany({
      where: {
        AND: [
          {
            scheduledSend: {
              lte: new Date(),
            },
          },
          {
            hasSent: false,
          },
        ],
      },
      select: {
        id: true,
        listId: true,
        subject: true,
        sendFromName: true,
        globalStyles: true,
        blocks: true,
      },
    });
    if (campaignsToSend.length > 0) {
      campaignsToSend.forEach(async (campaign) => {
        const list = await prisma.list.findUnique({
          where: {
            id: campaign.listId ?? "",
          },
          select: {
            contacts: {
              select: {
                email: true,
              },
            },
          },
        });

        sendEmail({
          htmlContent: renderToHtml(
            parseAndGenerateBlocks(String(campaign.blocks)),
            JSON.parse(String(campaign.globalStyles))
          ),
          sendFromName: campaign.sendFromName,
          subject: campaign.subject,
          recipients: list?.contacts.map((contact) => contact.email) ?? [],
        });

        await prisma.campaign.update({
          where: {
            id: campaign.id,
          },
          data: {
            hasSent: true,
          },
        });
      });
    }
  };

  try {
    void checkForEmailsToBeSent();
    res.json({ success: true, message: "complete" });
  } catch (err) {
    res.json({ success: true, message: err });
  }
}
