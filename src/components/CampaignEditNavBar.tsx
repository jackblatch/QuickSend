import { useEffect, useState } from "react";
import CircleSteps from "./CircleSteps";
import Logo from "./Logo";

export default function CampaignEditNavBar({ router }: { router: any }) {
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

  return (
    <div className="flex items-center justify-between bg-gray-800 p-3 px-8">
      <div className="flex items-center gap-10">
        <Logo justifyContent="start" type="iconAndText" colorTheme="light" />
        <h2 className="text-md max-w-[300px] truncate font-semibold text-gray-200">
          Email Campaign 'NAME'
        </h2>
      </div>
      <div>
        <CircleSteps steps={steps} />
      </div>
      <div className="bg-red-500">
        <p>Action buttons</p>
      </div>
    </div>
  );
}
