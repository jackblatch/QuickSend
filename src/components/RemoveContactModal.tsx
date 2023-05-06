import { type Dispatch, type SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Modal from "./Modal";

export default function RemoveContactModal({
  open,
  setOpen,
  listId,
  contact,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  listId: string;
  contact: { id: string; createdAt: Date; email: string };
}) {
  const utils = api.useContext();
  const removeContactFromList = api.contacts.removeContactFromList.useMutation({
    onSuccess: () => {
      void utils.lists.invalidate();
    },
  });

  return (
    <Modal
      heading="Remove contact from list"
      buttonCancelText="Cancel"
      buttonActionText="Delete"
      actionOnClick={() => {
        void toast.promise(
          removeContactFromList.mutateAsync({ listId, contactId: contact.id }),
          {
            loading: "Removing contact...",
            success: () => {
              setOpen(false);
              return "Contact removed!";
            },
            error: "Failed to remove contact",
          },
          {
            position: "bottom-center",
          }
        );
      }}
      open={open}
      setOpen={setOpen}
      actionType="danger"
    >
      <p>Are you sure you want to remove {contact.email} from this list?</p>
    </Modal>
  );
}
