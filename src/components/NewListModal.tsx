import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import AlertBlock from "./AlertBlock";
import InputWithLabel from "./InputWithLabel";
import Modal from "./Modal";

export default function NewListModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const utils = api.useContext();
  const [listName, setListName] = useState({ name: "" });
  const createList = api.lists.createList.useMutation({
    onSuccess: () => utils.lists.invalidate(),
  });

  return (
    <Modal
      heading="Create a New List"
      buttonCancelText="Cancel"
      buttonActionText="Create"
      actionOnClick={() => {
        void toast.promise(
          createList.mutateAsync(listName),
          {
            loading: "Creating list...",
            success: () => {
              setOpen(false);
              return "List created successfully!";
            },
            error: "Failed to create list",
          },
          {
            position: "bottom-center",
          }
        );
      }}
      open={open}
      setOpen={setOpen}
      actionType="success"
    >
      <div className="mt-6 pr-5">
        {createList.error && (
          <div className="mb-4">
            <AlertBlock type="error" heading="Missing field">
              Please enter a list name.
            </AlertBlock>
          </div>
        )}
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
