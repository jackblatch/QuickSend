import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import AddContactToListModal from "~/components/AddContactToListModal";
import Button from "~/components/Button";
import EmptyListState from "~/components/EmptyListState";
import RemoveContactModal from "~/components/RemoveContactModal";
import AdminLayout from "~/layouts/AdminLayout";
import { api } from "~/utils/api";
import formatClasses from "~/utils/formatClasses";
import formatDateTime from "~/utils/formatDateTime";

export default function ListDetails() {
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedlists, setSelectedlists] = useState<
    { id: string; email: string }[]
  >([]);
  const [showAddContactToListModal, setShowAddContactToListModal] =
    useState(false);
  const [showRemoveContactModal, setShowRemoveContactModal] = useState(false);
  const [currentEditContact, setCurrentEditContact] = useState<{
    id: string;
    createdAt: Date;
    email: string;
  }>({ id: "", createdAt: new Date(), email: "" });

  const utils = api.useContext();
  const removeMultipleContactsFromList =
    api.contacts.removeMultipleContactsFromList.useMutation({
      onSuccess: () => {
        utils.lists.invalidate();
      },
    });

  const router = useRouter();
  const { listId } = router.query;
  const getListInfo = api.lists.getListInfo.useQuery(listId as string);
  const contacts = getListInfo.data?.contacts ?? [];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && getListInfo.data) {
      setIsLoading(false);
    }
  }, [router, getListInfo]);

  useEffect(() => {
    if (getListInfo.data) {
      const isIndeterminate =
        selectedlists.length > 0 && selectedlists.length < contacts.length;
      setChecked(selectedlists.length === contacts.length);
      setIndeterminate(isIndeterminate);
      if (checkbox.current !== null) {
        checkbox.current.indeterminate = isIndeterminate;
      }
    }
  }, [selectedlists]);

  function toggleAll() {
    setSelectedlists(checked || indeterminate ? [] : contacts);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <>
      <Toaster />
      {isLoading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <EmptyListState listId={listId as string} />
      ) : (
        <>
          <div>
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
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <p className="mt-2 text-sm text-gray-700">
                  Here are the contacts in your list. Add or remove contacts
                  below.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Button
                  type="primary"
                  size="md"
                  onClick={() => {
                    setShowAddContactToListModal(true);
                    console.log("clcoc");
                  }}
                >
                  <p>Add New</p>
                </Button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    {selectedlists.length > 0 && (
                      <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 bg-white sm:left-12">
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
                                contactIds: selectedlists.map(
                                  (item) => item.id
                                ),
                              }),
                              {
                                loading: "Deleting...",
                                success: (res) => {
                                  setSelectedlists([]);
                                  return `Deleted ${res.length} list${
                                    res.length === 1 ? "" : "s"
                                  }`;
                                },
                                error: "Error deleting lists",
                              },
                              {
                                position: "bottom-center",
                              }
                            );
                          }}
                        >
                          Delete selected
                        </button>
                      </div>
                    )}
                    <table className="min-w-full table-fixed divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="relative px-7 sm:w-12 sm:px-6"
                          >
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              ref={checkbox}
                              checked={checked}
                              onChange={toggleAll}
                            />
                          </th>
                          <th
                            scope="col"
                            className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Date created
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                          >
                            <span className="sr-only">Delete</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {contacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className={
                              selectedlists.includes(contact)
                                ? "bg-gray-50"
                                : undefined
                            }
                          >
                            <td className="relative px-7 sm:w-12 sm:px-6">
                              {selectedlists.includes(contact) && (
                                <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                              )}
                              <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                value={contact.id}
                                checked={selectedlists.includes(contact)}
                                onChange={(e) =>
                                  setSelectedlists(
                                    e.target.checked
                                      ? [...selectedlists, contact]
                                      : selectedlists.filter(
                                          (l) => l !== contact
                                        )
                                  )
                                }
                              />
                            </td>
                            <td
                              className={formatClasses(
                                "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                                selectedlists.includes(contact)
                                  ? "text-blue-600"
                                  : "text-gray-900"
                              )}
                            >
                              {contact.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDateTime(contact.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                              <button
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => {
                                  setShowRemoveContactModal(true);
                                  setCurrentEditContact(contact);
                                }}
                              >
                                Delete
                                <span className="sr-only">{contact.email}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

ListDetails.getLayout = function getLayout(page: React.ReactNode) {
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
      {page}
    </AdminLayout>
  );
};
