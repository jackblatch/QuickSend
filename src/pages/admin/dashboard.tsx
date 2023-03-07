import { getSession } from "next-auth/react";
import Button from "~/components/Button";
import AdminLayout from "~/layouts/AdminLayout";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

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
