import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Button from "~/components/Button";
import MultiSelectTable from "~/components/MultiSelectTable";
import NewCampaignSlideOver from "~/components/NewCampaignSlideOver";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";

function Campaigns() {
  const [openNewCampaignSlideOut, setOpenNewCampaignSlideOut] = useState(false);
  const [currentEditContact, setCurrentEditContact] = useState<{
    id: string;
    createdAt: Date;
    email: string;
  }>({ id: "", createdAt: new Date(), email: "" });
  const [selectedlists, setSelectedlists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { listId } = router.query;

  //   const getListInfo = api.lists.getListInfo.useQuery(listId as string);
  //   const contacts = getListInfo.data?.contacts ?? [];

  const getCampaigns = api.campaigns.getCampaigns.useQuery();
  const campaigns = getCampaigns.data ?? [];

  useEffect(() => {
    if (router.isReady && getCampaigns.data) {
      setIsLoading(false);
    }
  }, [router, getCampaigns]);

  return (
    <>
      <Toaster />
      <NewCampaignSlideOver
        open={openNewCampaignSlideOut}
        setOpen={setOpenNewCampaignSlideOut}
      />
      <MultiSelectTable
        primaryScreenReaderInfo="name"
        isLoading={isLoading}
        tableData={campaigns}
        listId={listId as string}
        selectedlists={selectedlists}
        setSelectedlists={setSelectedlists}
        introText="View, edit or create a new campaign below."
        rowActionHighlight={true}
        topRowButtons={
          <>
            <Button
              appearance="primary"
              size="md"
              onClick={() => {
                setOpenNewCampaignSlideOut(true);
              }}
            >
              Create New
            </Button>
          </>
        }
        multiSelectButtons={
          <>
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Bulk edit
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => {
                //   toast.promise(
                //     removeMultipleContactsFromList.mutateAsync({
                //       listId: listId as string,
                //       contactIds: selectedlists,
                //     }),
                //     {
                //       loading: "Deleting...",
                //       success: (res) => {
                //         setSelectedlists([]);
                //         return `Deleted ${res.length} contact${
                //           res.length === 1 ? "" : "s"
                //         }`;
                //       },
                //       error: "Error deleting contact(s)",
                //     },
                //     {
                //       position: "bottom-center",
                //     }
                //   );
              }}
            >
              Delete selected
            </button>
          </>
        }
        tableColumnNames={[
          { id: "name", name: "Name" },
          { id: "subject", name: "Subject" },
          { id: "createdAt", name: "Created at" },
          { id: "updatedAt", name: "Updated at" },
        ]}
        screenReaderRowButtonText="View"
        rowButtonActions={(item: any) => {
          //   setShowRemoveContactModal(true);
          setCurrentEditContact(item);
        }}
        rowButtonText="View"
      ></MultiSelectTable>
    </>
  );
}

export default function () {
  return (
    <AdminLayout pageHeading="Campaigns">
      <Campaigns />
    </AdminLayout>
  );
}
