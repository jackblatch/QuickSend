import { useState } from "react";
import { api } from "~/utils/api";
import Button from "./Button";
import MultiSelectTable from "./MultiSelectTable";

export default function AllContactsTable() {
  const getAllUserContacts = api.contacts.getAllUserContacts.useQuery();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  return (
    <MultiSelectTable
      primaryScreenReaderInfo="name"
      isLoading={getAllUserContacts.isLoading}
      tableData={getAllUserContacts?.data ?? []}
      selectedlists={selectedContacts}
      setSelectedlists={setSelectedContacts}
      introText="View and manage all contacts on your account. Any changes you make will be reflected across your lists."
      rowActionHighlight={false}
      topRowButtons={
        <>
          <Button appearance="primary" size="md">
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
          >
            Delete selected
          </button>
        </>
      }
      tableColumnNames={[
        { id: "email", name: "Email" },
        { id: "createdAt", name: "Created at" },
      ]}
      screenReaderRowButtonText="Delete"
      rowButtonActions=""
      rowButtonText="Delete"
      titleLink={() => "#"}
    ></MultiSelectTable>
  );
}
