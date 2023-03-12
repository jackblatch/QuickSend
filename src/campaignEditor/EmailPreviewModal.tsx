import { useState } from "react";
import { toast } from "react-hot-toast";
import InputWithLabel from "~/components/InputWithLabel";
import Modal from "~/components/Modal";
import { api } from "~/utils/api";

export default function EmailPreviewModal({
  open,
  setOpen,
  sendFromName,
  subject,
  htmlContentFunc,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendFromName: string;
  subject: string;
  htmlContentFunc: () => string;
}) {
  const [formValues, setFormValues] = useState({ email: "" });

  const sendPreviewEmail = api.email.sendPreviewEmail.useMutation();

  return (
    <Modal
      heading="Send Preview Email"
      buttonActionText="Send Test"
      buttonCancelText="Cancel"
      actionType="success"
      open={open}
      setOpen={setOpen}
      actionOnClick={() => {
        toast.promise(
          sendPreviewEmail.mutateAsync({
            emailAddress: formValues.email,
            subject,
            sendFromName,
            htmlContent: htmlContentFunc(),
          }),
          {
            loading: "Sending...",
            success: "Email sent!",
            error: "Error sending email",
          },
          {
            position: "bottom-center",
          }
        );
        setOpen(false);
      }}
    >
      <div className="pr-5">
        <InputWithLabel
          label="Email Address"
          value={formValues.email}
          id="email"
          type="email"
          state={formValues}
          setState={setFormValues}
        />
      </div>
    </Modal>
  );
}
