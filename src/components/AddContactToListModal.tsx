import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import AlertBlock from "./AlertBlock";
import FileUpload from "./FileUpload";
import InputWithLabel from "./InputWithLabel";
import Modal from "./Modal";

export default function AddContactToListModal({
  open,
  setOpen,
  listId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
  listId: string;
}) {
  const utils = api.useContext();
  const [inputValues, setInputValues] = useState({ email: "" });
  const addContactToList = api.contacts.addContactToList.useMutation({
    onSuccess: () => utils.lists.invalidate(),
  });

  return (
    <Modal
      heading="Add contact to list"
      buttonCancelText="Cancel"
      buttonActionText="Add"
      actionOnClick={() => {
        toast.promise(
          addContactToList.mutateAsync({ email: inputValues.email, listId }),
          {
            loading: "Adding contact...",
            success: () => {
              setOpen(false);
              return "Contact added!";
            },
            error: "Failed to add contact",
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
        <>
          {addContactToList.error && (
            <div className="mb-4">
              <AlertBlock type="error" heading="Sorry, an error occured">
                Please try again later.
              </AlertBlock>
            </div>
          )}
          <InputWithLabel
            type="email"
            label="Email Address"
            id="email"
            state={inputValues}
            setState={setInputValues}
          />
        </>
        <FileUpload listId={listId} />
      </div>
    </Modal>
  );
}
