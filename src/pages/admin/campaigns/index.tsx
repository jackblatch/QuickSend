import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import EmptyListState from "~/components/EmptyListState";
import MultiSelectTable from "~/components/MultiSelectTable";
import NewCampaignSlideOver from "~/components/NewCampaignSlideOver";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

function Campaigns() {
  const [openNewCampaignSlideOut, setOpenNewCampaignSlideOut] = useState(false);
  const [selectedlists, setSelectedlists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { listId } = router.query;

  const utils = api.useContext();
  const deleteCampaigns = api.campaigns.deleteCampaigns.useMutation({
    onSuccess: () => utils.campaigns.invalidate(),
  });
  const getCampaigns = api.campaigns.getCampaigns.useQuery();
  const campaigns = getCampaigns.data ?? [];

  useEffect(() => {
    if (router.isReady && getCampaigns.data) {
      setIsLoading(false);
    }
  }, [router, getCampaigns]);

  return (
    <>
      <NewCampaignSlideOver
        open={openNewCampaignSlideOut}
        setOpen={setOpenNewCampaignSlideOut}
      />
      {isLoading || (getCampaigns.data && getCampaigns.data.length > 0) ? (
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
                  toast.promise(
                    deleteCampaigns.mutateAsync({ campaignIds: selectedlists }),
                    {
                      loading: "Deleting...",
                      success: () => {
                        setSelectedlists([]);
                        return "Deleted lists";
                      },
                      error: "Error",
                    },
                    {
                      position: "bottom-center",
                    }
                  );
                }}
              >
                Delete selected
              </button>
            </>
          }
          tableColumnNames={[
            { id: "name", name: "Name" },
            { id: "subject", name: "Subject" },
            { id: "hasSent", name: "Status" },
            { id: "scheduledSend", name: "Scheduled for" },
            { id: "updatedAt", name: "Last updated" },
          ]}
          screenReaderRowButtonText="View"
          rowButtonActions={(item: any) => {
            router.push(`/admin/campaign/view/${item.id}`);
          }}
          rowButtonText="View"
          titleLink={(item: any) => `/admin/campaign/view/${item.id}`}
        />
      ) : (
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-200 p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-xl font-medium">No campaigns</h3>
            <p>
              Create a new campaign below. Before creating your first campaign,
              make sure to have a list created.{" "}
            </p>
          </div>
          <div className="w-fit">
            <Button
              appearance="primary"
              size="md"
              onClick={() => {
                setOpenNewCampaignSlideOut(true);
              }}
            >
              Create New
            </Button>
          </div>
        </div>
      )}
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
