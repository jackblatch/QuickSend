import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import DescriptionRow from "./DescriptionRow";
import LineTabs from "./LineTabs";
import Modal from "./Modal";
import InputWithLabel from "~/components/InputWithLabel";

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
  list: { id: string; name: string; _count: { contacts: number } } | null;
  campaignName: string;
  campaignId: string;
  htmlContentFunc: () => string;
}) {
  const utils = api.useContext();
  const sendEmailsToList = api.email.sendEmailsToList.useMutation();
  const scheduleCampaign = api.campaigns.scheduleCampaign.useMutation({
    onSuccess: () => utils.campaigns.invalidate(),
  });
  const [tabs, setTabs] = useState([
    {
      name: "Send Now",
      current: true,
    },
    { name: "Schedule for Later", current: false },
  ]);

  const [formValues, setFormValues] = useState({
    scheduledDateTime: "",
  });

  return (
    <Modal
      buttonActionText={tabs[0]?.current ? "Send Now" : "Schedule"}
      buttonCancelText="Cancel"
      actionType="success"
      open={open}
      setOpen={setOpen}
      actionOnClick={() => {
        if (list) {
          if (tabs[0]?.current) {
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
          } else {
            toast.promise(
              scheduleCampaign.mutateAsync({
                campaignId,
                scheduledSend: new Date(formValues.scheduledDateTime),
              }),
              {
                loading: "Scheduling...",
                success: () => {
                  setOpen(false);
                  return "Campaign scheduled!";
                },
                error: "Error scheduling campaign",
              },
              {
                position: "bottom-center",
              }
            );
          }
        } else {
          toast.error("Please select a list before sending", {
            position: "bottom-center",
          });
        }
      }}
    >
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <div className="mb-4">
        <div className="pt-8 pb-2 text-center ">
          <h2 className="mb-2 text-2xl font-semibold">
            {tabs[0]?.current ? "Ready to send?" : "Schedule for later"}
          </h2>
          <p className="mb-4">
            {tabs[0]?.current
              ? "Check that everything looks right before sending"
              : "When should this campaign be sent?"}
          </p>
        </div>
        {list ? (
          <>
            {tabs[1]?.current && (
              <div className="mb-6 rounded-md bg-gray-100 p-4">
                <InputWithLabel
                  label="Choose date and time"
                  type="datetime-local"
                  id="scheduledDateTime"
                  state={formValues}
                  setState={setFormValues}
                  min={new Date().toISOString().split(".")[0]}
                />
              </div>
            )}
            <div className="rounded-md bg-gray-100 p-4">
              <DescriptionRow title="Campaign" value={campaignName} />
              <DescriptionRow title="List" value={list.name} />
              <DescriptionRow
                title="Total Recipients"
                value={`${list._count.contacts} ${
                  list._count.contacts === 1 ? "contact" : "contacts"
                }`}
              />
            </div>
          </>
        ) : (
          <p>Please select a list before sending</p>
        )}
      </div>
    </Modal>
  );
}
