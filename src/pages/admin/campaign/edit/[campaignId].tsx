import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CampaignEditNavBar from "~/components/CampaignEditNavBar";
import CircleSteps from "~/components/CircleSteps";
import Logo from "~/components/Logo";

export default function CampaignBuilder() {
  const router = useRouter();
  const { campaignId } = router.query;

  return (
    <div className="flex min-h-[100vh] flex-col">
      <CampaignEditNavBar router={router} />
      <div className="flex flex-1">
        {/* <LineTabs /> */}
        <div className="min-w-[400px] border-r border-gray-300 bg-white p-8">
          Editing
        </div>
        <div className="flex-1 bg-gray-50 p-8">Body</div>
      </div>
      <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-white p-2 text-xs text-gray-600">
        <p>Support</p>
        <p>Documentation</p>
      </div>
    </div>
  );
}
