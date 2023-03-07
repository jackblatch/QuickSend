import { getSession } from "next-auth/react";
import AllContactsTable from "~/components/AllContactsTable";
import Loading from "~/components/Loading";
import StackedList from "~/components/StackedList";
import StatsRow from "~/components/StatsRow";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

function Dashboard() {
  const getAllUserContacts = api.contacts.getAllUserContacts.useQuery();
  const getListsCount = api.lists.getListsCount.useQuery();
  const getSentCampaignCount = api.campaigns.getSentCampaignCount.useQuery();

  if (
    getAllUserContacts.isLoading ||
    getListsCount.isLoading ||
    getSentCampaignCount.isLoading
  )
    return <Loading />;

  return (
    <div className="mt-8 flex flex-col gap-8">
      <StatsRow
        stats={[
          {
            name: "Total Contacts",
            stat: getAllUserContacts.data
              ? String(getAllUserContacts.data?.length)
              : "",
          },
          {
            name: "Email Lists",
            stat: getListsCount?.data ? String(getListsCount?.data) : "",
          },
          {
            name: "Campaigns Sent",
            stat: getSentCampaignCount?.data
              ? String(getSentCampaignCount?.data)
              : "",
          },
        ]}
      />
      <div>
        <h3 className="text-xl font-semibold ">Your contacts</h3>
        <AllContactsTable contacts={getAllUserContacts?.data ?? []} />
      </div>
    </div>
  );
}

export default function () {
  return (
    <AdminLayout pageHeading="Dashboard">
      <Dashboard />
    </AdminLayout>
  );
}
