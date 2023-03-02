import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Breadcrumbs from "~/components/Breadcrumbs";
import Button from "~/components/Button";
import NewListModal from "~/components/NewListModal";
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
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showUpdateContactModal, setShowUpdateContactModal] = useState(false);

  const utils = api.useContext();
  const deleteLists = api.lists.deleteLists.useMutation({
    onSuccess: () => {
      utils.lists.invalidate();
    },
  });

  const router = useRouter();
  const { listId } = router.query;
  const getListInfo = api.lists.getListInfo.useQuery(listId as string);
  const contacts = getListInfo.data?.contacts ?? [];
  const [isLoading, setIsLoading] = useState(true);

  console.log({ contacts });

  const pages = useMemo(() => {
    return [
      { name: "Lists", href: "/admin/lists", current: false },
      { name: getListInfo.data?.name ?? "List", href: "#", current: true },
    ];
  }, [getListInfo.data]);

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
      ) : (
        <>
          <div className="my-3">
            <Breadcrumbs pages={pages} />
          </div>
          <div>
            {showNewListModal && (
              <NewListModal
                open={showNewListModal}
                setOpen={setShowNewListModal}
              />
            )}
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <p className="mt-2 text-sm text-gray-700">
                  Here are the lists you have created. You can create a new list
                  or edit an existing list below.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Button
                  type="primary"
                  size="md"
                  onClick={() => setShowNewListModal(true)}
                >
                  <p>Add New</p>
                </Button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="relative">
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
                              deleteLists.mutateAsync(
                                selectedlists.map((item) => item.id)
                              ),
                              {
                                loading: "Deleting...",
                                success: (res) => {
                                  setSelectedlists([]);
                                  return `Deleted ${res.count} list${
                                    res.count === 1 ? "" : "s"
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
                      <thead>
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
                            <span className="sr-only">Edit</span>
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
                              <Link href={`/admin/lists/${contact.id}`}>
                                {contact.email}
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDateTime(contact.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => {
                                  setShowUpdateContactModal(true);
                                }}
                              >
                                Edit
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
  const getList = api.lists.getListInfo.useQuery(listId as string);
  const listName = getList.data?.name ?? "";

  return <AdminLayout pageHeading={listName}>{page}</AdminLayout>;
};
