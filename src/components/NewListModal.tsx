import { Dispatch, SetStateAction, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import Modal from "./Modal";

export default function NewListModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
}) {
  const [listName, setListName] = useState({ name: "" });

  return (
    <Modal
      heading="Create a New List"
      buttonCancelText="Cancel"
      buttonActionText="Create"
      open={open}
      setOpen={setOpen}
      actionType="success"
    >
      <div className="mt-6 pr-5">
        <InputWithLabel
          type="text"
          label="List Name"
          id="name"
          state={listName}
          setState={setListName}
        />
      </div>
    </Modal>
  );
}
