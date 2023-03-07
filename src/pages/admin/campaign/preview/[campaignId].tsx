import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Block } from "~/campaignEditor/utils/blockattributes";
import { parseAndGenerateBlocks } from "~/campaignEditor/utils/campaignEditorUtils";
import Button from "~/components/Button";
import Logo from "~/components/Logo";
import { api } from "~/utils/api";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

export default function CampaignPreview() {
  const router = useRouter();

  const getCampaignEditorInfo = api.campaigns.getCampaignEditorInfo.useQuery({
    campaignId: router.query.campaignId as string,
  });

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [globalStyles, setGlobalStyles] = useState({});

  useEffect(() => {
    if (getCampaignEditorInfo.data && blocks.length === 0) {
      const newBlocks = parseAndGenerateBlocks(
        getCampaignEditorInfo.data.blocks as string
      );
      if (newBlocks) {
        setBlocks(newBlocks);
      }
      const globalStyles = JSON.parse(
        getCampaignEditorInfo.data.globalStyles as string
      );
      if (globalStyles) {
        setGlobalStyles(globalStyles);
      }
    }
  }, [getCampaignEditorInfo.data]);

  return (
    <>
      <Head>
        <title>Preview {getCampaignEditorInfo?.data?.name} - QuickSend</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-[100vh] flex-col items-center justify-center gap-8 bg-gray-100">
        <div className="flex w-full items-center justify-between bg-gray-800 p-6">
          <Logo justifyContent="center" type="iconAndText" colorTheme="light" />
          <Link href={`/admin/campaign/view/${router.query.campaignId}`}>
            <Button appearance="secondary" size="md">
              Manage Campaign
            </Button>
          </Link>
        </div>
        <div className="flex-1">
          <div className="w-[600px]">
            <h2 className="text-xl font-semibold text-gray-900">
              Email Preview
            </h2>
            <p className="mb-4 text-sm">
              <span className="mr-2 font-semibold text-gray-900">
                Campaign:
              </span>
              {getCampaignEditorInfo?.data?.name}
            </p>
            <div style={globalStyles}>
              {blocks.map((block) => (
                <div key={block.id}>{block.element}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
