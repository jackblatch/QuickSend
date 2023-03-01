import AdminLayout from "~/layouts/AdminLayout";

export default function Dashboard() {
  return <>Dashboard</>;
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
