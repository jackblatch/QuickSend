import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import InputWithLabel from "./InputWithLabel";
import Modal from "./Modal";

export default function EditListNameModal({
  open,
  setOpen,
  listId,
  existingName,
}: {
  listId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  existingName: string;
}) {
  const [inputValues, setInputValues] = useState({ name: existingName });

  const utils = api.useContext();

  const editListName = api.lists.editListName.useMutation({
    onSuccess: () => utils.lists.invalidate(),
  });

  return (
    <Modal
      heading="Edit List Name"
      buttonCancelText="Cancel"
      buttonActionText="Save"
      actionOnClick={() => {
        toast.promise(
          editListName.mutateAsync({ name: inputValues.name, listId }),
          {
            loading: "Editing list...",
            success: () => {
              setOpen(false);
              return "List updated!";
            },
            error: "Failed to update list",
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
      <div className="mb-6 pr-5">
        <InputWithLabel
          label="List Name"
          id="name"
          type="text"
          state={inputValues}
          setState={setInputValues}
        />
      </div>
    </Modal>
  );
}
