import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
import ComboBox from "./ComboBox";
import InputWithLabel from "./InputWithLabel";
import SlideOver from "./SlideOver";

export default function NewCampaignSlideOver({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [inputValues, setInputValues] = useState({
    campaignName: "",
    emailSubject: "",
    fromName: "",
  });

  const lists = api.lists.getLists.useQuery();
  const listData = lists?.data ?? [];

  const [selectedList, setSelectedList] = useState(listData[0]?.name ?? "");
  console.log(selectedList);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      heading="New Campaign"
      subheading="Complete the following fields to create a new campaign."
      actionText="Create"
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <InputWithLabel
          label="Campaign Name"
          id="campaignName"
          type="text"
          state={inputValues}
          setState={setInputValues}
        />
        <InputWithLabel
          label="Email Subject"
          id="emailSubject"
          type="text"
          state={inputValues}
          setState={setInputValues}
        />
        <InputWithLabel
          label="From Name"
          placeholder="The 'from' name displayed in the email"
          id="fromName"
          type="text"
          state={inputValues}
          setState={setInputValues}
        />
        <ComboBox
          label="Select list to send to"
          comboBoxValues={listData.map((item) => ({
            id: item.id,
            value: item.name,
          }))}
          selectedValue={selectedList}
          setSelectedValue={setSelectedList}
        />
      </div>
    </SlideOver>
  );
}
