import { getSession } from "next-auth/react";
import AdminLayout from "~/layouts/AdminLayout";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

function Dashboard() {
  return <></>;
}

export default function () {
  return (
    <AdminLayout pageHeading="Dashboard">
      <Dashboard />
    </AdminLayout>
  );
}
