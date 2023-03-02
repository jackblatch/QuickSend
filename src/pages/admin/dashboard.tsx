import Button from "~/components/Button";
import AdminLayout from "~/layouts/AdminLayout";

export default function Dashboard() {
  return <></>;
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout pageHeading="Dashboard">{page}</AdminLayout>;
};
