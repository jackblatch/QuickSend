import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import AddContactToListModal from "~/components/AddContactToListModal";
import Button from "~/components/Button";
import EditListNameModal from "~/components/EditListNameModal";
import MultiSelectTable from "~/components/MultiSelectTable";
import RemoveContactModal from "~/components/RemoveContactModal";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";

function ListDetails() {
  const [showRemoveContactModal, setShowRemoveContactModal] = useState(false);
  const [currentEditContact, setCurrentEditContact] = useState<{
    id: string;
    createdAt: Date;
    email: string;
  }>({ id: "", createdAt: new Date(), email: "" });
  const [showAddContactToListModal, setShowAddContactToListModal] =
    useState(false);
  const [showEditListNameModal, setShowEditListNameModal] = useState(false);
  const [selectedlists, setSelectedlists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { listId } = router.query;

  const getListInfo = api.lists.getListInfo.useQuery(listId as string);
  const contacts = getListInfo.data?.contacts ?? [];

  const utils = api.useContext();
  const removeMultipleContactsFromList =
    api.contacts.removeMultipleContactsFromList.useMutation({
      onSuccess: () => {
        utils.lists.invalidate();
      },
    });

  useEffect(() => {
    if (router.isReady && getListInfo.data) {
      setIsLoading(false);
    }
  }, [router, getListInfo]);

  return (
    <MultiSelectTable
      isLoading={isLoading}
      primaryScreenReaderInfo="email"
      tableData={contacts}
      listId={listId as string}
      selectedlists={selectedlists}
      setSelectedlists={setSelectedlists}
      introText="Here are the contacts in your list. Add or remove contacts
      below."
      topRowButtons={
        <>
          <Button
            appearance="secondary"
            size="md"
            onClick={() => {
              setShowEditListNameModal(true);
            }}
          >
            Edit List Name
          </Button>
          <Button
            appearance="primary"
            size="md"
            onClick={() => {
              setShowAddContactToListModal(true);
            }}
          >
            Add New
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
                removeMultipleContactsFromList.mutateAsync({
                  listId: listId as string,
                  contactIds: selectedlists,
                }),
                {
                  loading: "Deleting...",
                  success: (res) => {
                    setSelectedlists([]);
                    return `Deleted ${res.length} contact${
                      res.length === 1 ? "" : "s"
                    }`;
                  },
                  error: "Error deleting contact(s)",
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
        { id: "email", name: "Email" },
        { id: "createdAt", name: "Date added" },
      ]}
      screenReaderRowButtonText="Delete"
      rowButtonActions={(item: any) => {
        setShowRemoveContactModal(true);
        setCurrentEditContact(item);
      }}
      rowButtonText="Delete"
    >
      {showRemoveContactModal && (
        <RemoveContactModal
          open={showRemoveContactModal}
          setOpen={setShowRemoveContactModal}
          listId={listId as string}
          contact={currentEditContact}
        />
      )}
      {showAddContactToListModal && (
        <AddContactToListModal
          open={showAddContactToListModal}
          setOpen={setShowAddContactToListModal}
          listId={listId as string}
        />
      )}
      {showEditListNameModal && (
        <EditListNameModal
          open={showEditListNameModal}
          setOpen={setShowEditListNameModal}
          listId={listId as string}
          existingName={getListInfo.data?.name ?? ""}
        />
      )}
    </MultiSelectTable>
  );
}

export default function () {
  const router = useRouter();
  const { listId } = router.query;
  const getListInfo = api.lists.getListInfo.useQuery(listId as string);
  const listName = getListInfo.data?.name ?? "";

  const pages = useMemo(() => {
    return [
      { name: "Lists", href: "/admin/lists", current: false },
      { name: listName ?? "List", href: "#", current: true },
    ];
  }, [getListInfo.data]);

  return (
    <AdminLayout pageHeading={listName} pages={pages}>
      <ListDetails />
    </AdminLayout>
  );
}
