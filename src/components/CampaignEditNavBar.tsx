import { useEffect, useState } from "react";
import Button from "./Button";
import CircleSteps from "./CircleSteps";
import Logo from "./Logo";

export default function CampaignEditNavBar({
  router,
  blocks,
}: {
  router: any;
  blocks: any[];
}) {
  const { campaignId } = router.query;

  const [steps, setSteps] = useState<
    {
      name: string;
      href: string;
      status: "complete" | "current" | "upcoming";
    }[]
  >([
    {
      name: "Create",
      href: "#",
      status: "complete",
    },
    { name: "Design", href: "#", status: "current" },
    {
      name: "Review",
      href: "#",
      status: "upcoming",
    },
  ]);

  useEffect(() => {
    if (router.isReady) {
      setSteps([
        {
          name: "Create",
          href: `/admin/campaign/view/${campaignId}`,
          status: "complete",
        },
        { name: "Design", href: "#", status: "current" },
        {
          name: "Review",
          href: `#`,
          status: "upcoming",
        },
      ]);
    }
  }, [router]);

  const handleSaveAndExit = () => {
    // save to DB
    router.push(`/admin/campaign/view/${campaignId}`);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 bg-gray-800 p-3 px-6 lg:flex-row lg:gap-0">
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
        <Logo justifyContent="start" type="iconAndText" colorTheme="light" />
        <h2 className="text-md max-w-[300px] truncate font-semibold text-gray-200">
          Email Campaign 'NAME'
        </h2>
      </div>
      <div>
        <CircleSteps steps={steps} />
      </div>
      <div className="flex items-center gap-4">
        <Button appearance="secondary" size="md">
          Discard
        </Button>
        <Button appearance="primary" size="md" onClick={handleSaveAndExit}>
          Save and Exit
        </Button>
      </div>
    </div>
  );
}
