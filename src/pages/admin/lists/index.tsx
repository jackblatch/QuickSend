import AdminLayout from "~/layouts/AdminLayout";
import { useLayoutEffect, useRef, useState } from "react";
import formatClasses from "~/utils/formatClasses";
import Button from "~/components/Button";
import { api } from "~/utils/api";
import formatDateTime from "~/utils/formatDateTime";
import NewListModal from "~/components/NewListModal";
import { toast, Toaster } from "react-hot-toast";

export default function List() {
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedlists, setSelectedlists] = useState<
    { id: string; createdAt: Date; name: string }[]
  >([]);
  const allLists = api.lists.getLists.useQuery();
  const lists = allLists.data ?? [];
  const [showNewListModal, setShowNewListModal] = useState(false);

  const utils = api.useContext();
  const deleteLists = api.lists.deleteLists.useMutation({
    onSuccess: () => {
      utils.lists.invalidate();
    },
  });

  useLayoutEffect(() => {
    if (allLists.data) {
      const isIndeterminate =
        selectedlists.length > 0 && selectedlists.length < lists.length;
      setChecked(selectedlists.length === lists.length);
      setIndeterminate(isIndeterminate);
      if (checkbox.current !== null) {
        checkbox.current.indeterminate = isIndeterminate;
      }
    }
  }, [selectedlists]);

  function toggleAll() {
    setSelectedlists(checked || indeterminate ? [] : lists);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div>
      <Toaster />
      {showNewListModal && (
        <NewListModal open={showNewListModal} setOpen={setShowNewListModal} />
      )}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">
            Here are the lists you have created. You can create a new list or
            edit an existing list below.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            type="primary"
            size="md"
            onClick={() => setShowNewListModal(true)}
          >
            <p>New List</p>
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
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
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
                      List Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Members
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
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
                  {lists.map((list) => (
                    <tr
                      key={list.id}
                      className={
                        selectedlists.includes(list) ? "bg-gray-50" : undefined
                      }
                    >
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedlists.includes(list) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          value={list.id}
                          checked={selectedlists.includes(list)}
                          onChange={(e) =>
                            setSelectedlists(
                              e.target.checked
                                ? [...selectedlists, list]
                                : selectedlists.filter((l) => l !== list)
                            )
                          }
                        />
                      </td>
                      <td
                        className={formatClasses(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                          selectedlists.includes(list)
                            ? "text-blue-600"
                            : "text-gray-900"
                        )}
                      >
                        {list.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {list._count.contacts}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDateTime(list.createdAt)}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit<span className="sr-only">, {list.name}</span>
                        </a>
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
  );
}

List.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout pageHeading="Lists">{page}</AdminLayout>;
};
