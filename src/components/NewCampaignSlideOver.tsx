import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import CampaignInputFields from "./CampaignInputFields";
import ComboBox from "./ComboBox";
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
  setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
  const router = useRouter();

  const [inputValues, setInputValues] = useState(initialInputValues);

  const lists = api.lists.getLists.useQuery();
  const listData = lists?.data ?? [];

  const createCampaign = api.campaigns.createCampaign.useMutation();

  const [selectedList, setSelectedList] = useState({
    id: listData[0]?.id ?? "",
    value: listData[0]?.name ?? "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      createCampaign.mutateAsync({
        campaignName: inputValues.campaignName,
        emailSubject: inputValues.emailSubject,
        fromName: inputValues.fromName,
        listId: selectedList.id,
      }),
      {
        loading: "Creating campaign...",
        success: (res) => {
          router.push(`/admin/campaign/${res.id}`);
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
      openActions={() => setInputValues(initialInputValues)}
      open={open}
      setOpen={setOpen}
      heading="New Campaign"
      subheading="Complete the following fields to create a new campaign."
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
