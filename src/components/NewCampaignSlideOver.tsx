import { FormEvent } from "react";
import SlideOver from "./SlideOver";

export default function NewCampaignSlideOver({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("ss");
  };

  return (
    <SlideOver
      open={open}
      setOpen={setOpen}
      heading="New Campaign"
      subheading="Complete the following fields to create a new campaign."
      actionText="Create"
      handleSubmit={handleSubmit}
    />
  );
}
