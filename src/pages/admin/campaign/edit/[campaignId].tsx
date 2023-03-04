import { useRouter } from "next/router";
import { useState } from "react";
import Button from "~/components/Button";
import CampaignEditNavBar from "~/components/CampaignEditNavBar";
import CampaignEditorSidebar from "~/components/CampaignEditorSidebar";

export default function CampaignBuilder() {
  const router = useRouter();

  const [tabs, setTabs] = useState([
    {
      name: "Content",
      current: true,
    },
    { name: "Global Styles", current: false },
  ]);

  return (
    <div className="flex min-h-[100vh] flex-col">
      <CampaignEditNavBar router={router} />
      <div className="flex flex-1">
        {/* <LineTabs /> */}
        <div className="min-w-[400px] border-r border-gray-200 bg-white py-2">
          <CampaignEditorSidebar tabs={tabs} setTabs={setTabs} />
        </div>
        <div className="flex-1 bg-gray-50">
          <div className="flex h-[62px] items-center justify-end border-b border-gray-200 bg-white px-6">
            <Button appearance="secondary" size="sm">
              Send Preview
            </Button>
          </div>
          <div className="flex justify-center pt-12">
            <div className="min-w-[600px] max-w-[600px] bg-red-500">
              <p>dd</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-white p-2 text-xs text-gray-600">
        <p>Support</p>
        <p>Documentation</p>
      </div>
    </div>
  );
}
