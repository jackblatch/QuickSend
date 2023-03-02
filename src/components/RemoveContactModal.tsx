import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import AlertBlock from "./AlertBlock";
import InputWithLabel from "./InputWithLabel";
import Modal from "./Modal";

export default function RemoveContactModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
}) {
  const utils = api.useContext();
  const [listName, setListName] = useState({ name: "" });
  const removeContact = api.lists.createList.useMutation({
    onSuccess: () => utils.lists.invalidate(),
  });

  return (
    <Modal
      heading="Create a New List"
      buttonCancelText="Cancel"
      buttonActionText="Create"
      actionOnClick={() => {
        toast.promise(
          removeContact.mutateAsync(listName),
          {
            loading: "Updating contact...",
            success: () => {
              setOpen(false);
              return "Contact updated successfully!";
            },
            error: "Failed to update contact",
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
        {removeContact.error && (
          <div className="mb-4">
            <AlertBlock type="error" heading="Missing field">
              Please enter a valid email address
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
