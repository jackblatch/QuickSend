import { useMemo } from "react";
import AllContactsTable from "~/components/AllContactsTable";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

export function Contacts() {
  return <AllContactsTable />;
}

export default function () {
  const pages = useMemo(() => {
    return [
      { name: "Lists", href: "/admin/lists", current: false },
      { name: "All Contacts", href: "#", current: true },
    ];
  }, []);

  return (
    <AdminLayout pageHeading="All Contacts" pages={pages}>
      <Contacts />
    </AdminLayout>
  );
}
