import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Modal from "./Modal";

export default function SendEmailModal({
  open,
  setOpen,
  sendFromName,
  subject,
  htmlContentFunc,
  list,
  campaignId,
  campaignName,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendFromName: string;
  subject: string;
  list: { id: string; name: string; _count: { contacts: number } };
  campaignName: string;
  campaignId: string;
  htmlContentFunc: () => string;
}) {
  const sendEmailsToList = api.email.sendEmailsToList.useMutation();

  return (
    <Modal
      heading="Ready to send?"
      buttonActionText="Send Email"
      buttonCancelText="Cancel"
      actionType="success"
      open={open}
      setOpen={setOpen}
      actionOnClick={() => {
        toast.promise(
          sendEmailsToList.mutateAsync({
            listId: list.id,
            campaignId,
            subject,
            sendFromName,
            htmlContent: htmlContentFunc(),
          }),
          {
            loading: "Sending...",
            success: () => {
              setOpen(false);
              return "Campaign sent!";
            },
            error: "Error sending email",
          },
          {
            position: "bottom-center",
          }
        );
        console.log(htmlContentFunc());
      }}
    >
      <p className="mb-4">
        You are about to send campaign '{campaignName}' to your list {list.name}{" "}
        which contains {list._count.contacts} recipient
        {list._count.contacts === 1 ? "" : "s"}.
      </p>
    </Modal>
  );
}
