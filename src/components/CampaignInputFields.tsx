import ComboBox from "./ComboBox";
import InputWithLabel from "./InputWithLabel";

type inputValues = {
  campaignName: string;
  emailSubject: string;
  fromName: string;
};

export default function CampaignInputFields({
  inputValues,
  setInputValues,
  listData,
  selectedList,
  setSelectedList,
}: {
  inputValues: inputValues;
  setInputValues: React.Dispatch<React.SetStateAction<inputValues>>;
  listData: any;
  selectedList: any;
  setSelectedList: any;
}) {
  return (
    <>
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
        id="fromName"
        type="text"
        state={inputValues}
        setState={setInputValues}
      />
      <ComboBox
        label="Select list to send to"
        comboBoxValues={listData.map((item: { id: string; name: string }) => ({
          id: item.id,
          value: item.name,
        }))}
        selectedValue={selectedList}
        setSelectedValue={setSelectedList}
      />
    </>
  );
}
