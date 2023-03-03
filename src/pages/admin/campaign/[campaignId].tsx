import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import CampaignInputFields from "~/components/CampaignInputFields";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";

const initialInputValues = {
  campaignName: "",
  emailSubject: "",
  fromName: "",
};

function CampaignDetails() {
  const router = useRouter();
  const { campaignId } = router.query;
  const getCampaignInfo = api.campaigns.getCampaignInfo.useQuery({
    campaignId: campaignId as string,
  });

  const [inputValues, setInputValues] = useState(initialInputValues);

  const lists = api.lists.getLists.useQuery();
  const listData = lists?.data ?? [];

  const [selectedList, setSelectedList] = useState({ id: "", value: "" });

  useEffect(() => {
    if (getCampaignInfo.data) {
      setInputValues({
        campaignName: getCampaignInfo.data.name,
        emailSubject: getCampaignInfo.data.subject,
        fromName: getCampaignInfo.data.sendFromName,
      });
    }
  }, [getCampaignInfo.data]);

  useEffect(() => {
    if (lists.data && lists.data[0]) {
      setSelectedList({
        id: lists.data[0].id,
        value: lists.data[0].name,
      });
    }
  }, [lists.data]);

  return (
    <>
      <Toaster />
      <div className="mt-6 flex flex-col gap-4">
        {getCampaignInfo.isLoading || lists.isLoading ? (
          <p>Loading...</p>
        ) : (
          <CampaignInputFields
            inputValues={inputValues}
            setInputValues={setInputValues}
            listData={listData}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
      </div>
    </>
  );
}

export default function () {
  const router = useRouter();
  const { campaignId } = router.query;
  const getCampaignInfo = api.campaigns.getCampaignInfo.useQuery({
    campaignId: campaignId as string,
  });
  const campaignName = getCampaignInfo.data?.name ?? "";

  const pages = useMemo(() => {
    return [
      { name: "Campaigns", href: "/admin/campaigns", current: false },
      { name: campaignName ?? "", href: "#", current: true },
    ];
  }, [getCampaignInfo.data]);

  return (
    <AdminLayout pageHeading={campaignName} pages={pages}>
      <CampaignDetails />
    </AdminLayout>
  );
}
