import AdminLayout from "~/layouts/AdminLayout";

export default function List() {
  return (
    <div>
      <h1>List</h1>
    </div>
  );
}

List.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout pageHeading="Lists">{page}</AdminLayout>;
};
