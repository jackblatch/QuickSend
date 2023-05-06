import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import CampaignInputFields from "./CampaignInputFields";
import SlideOver from "./SlideOver";

const initialInputValues = {
  campaignName: "",
  emailSubject: "",
  fromName: "",
};

export default function NewCampaignSlideOver({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [inputValues, setInputValues] = useState(initialInputValues);

  const lists = api.lists.getLists.useQuery();
  const listData = lists?.data ?? [];

  const createCampaign = api.campaigns.createCampaign.useMutation();

  const [selectedList, setSelectedList] = useState({
    id: "",
    value: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void toast.promise(
      createCampaign.mutateAsync({
        campaignName: inputValues.campaignName,
        emailSubject: inputValues.emailSubject,
        fromName: inputValues.fromName,
        listId: selectedList.id,
      }),
      {
        loading: "Creating campaign...",
        success: (res) => {
          void router.push(`/admin/campaign/view/${res.id}`);
          return "Campaign created!";
        },
        error: "Error creating campaign",
      },
      {
        position: "bottom-center",
      }
    );
  };

  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      heading="New Campaign"
      subheading="Complete the following fields to create a new campaign. These details can be edited later."
      actionText="Create"
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <CampaignInputFields
          inputValues={inputValues}
          setInputValues={setInputValues}
          listData={listData}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </div>
    </SlideOver>
  );
}
