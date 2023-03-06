import Link from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import EmptyListState from "~/components/EmptyListState";
import formatClasses from "~/utils/formatClasses";
import formatDateTime from "~/utils/formatDateTime";

type Props = {
  topRowButtons: React.ReactNode;
  multiSelectButtons: React.ReactNode;
  tableColumnNames: Array<{ id: string; name: string }>;
  screenReaderRowButtonText: string;
  tableData: any[];
  rowButtonText: string;
  introText: string;
  isLoading: boolean;
  listId: string;
  selectedlists: any[];
  rowButtonActions: any;
  primaryScreenReaderInfo: string;
  rowActionHighlight?: boolean;
  titleLink?: (item: any) => string;
  setSelectedlists: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function MultiSelectTable({
  topRowButtons,
  multiSelectButtons,
  tableColumnNames,
  screenReaderRowButtonText,
  tableData,
  rowButtonText,
  introText,
  isLoading,
  listId,
  selectedlists,
  setSelectedlists,
  rowActionHighlight,
  rowButtonActions,
  primaryScreenReaderInfo,
  titleLink,
  children,
}: PropsWithChildren<Props>) {
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    // if (getListInfo.data) { // MAY NEED TO ADD BACK IN?
    const isIndeterminate =
      selectedlists.length > 0 && selectedlists.length < tableData.length;
    setChecked(
      tableData.length !== 0 && selectedlists.length === tableData.length
        ? true
        : false
    );
    setIndeterminate(isIndeterminate);
    if (checkbox.current !== null) {
      checkbox.current.indeterminate = isIndeterminate;
    }
    // }
  }, [selectedlists]);

  function toggleAll() {
    setSelectedlists(
      checked || indeterminate ? [] : tableData.map((item) => item.id)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : tableData.length === 0 ? (
        <EmptyListState listId={listId} />
      ) : (
        <>
          <div>
            {children}
            {/* table start */}
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <p className="mt-2 text-sm text-gray-700">{introText}</p>
              </div>
              <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-16">
                {topRowButtons}
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    {selectedlists.length > 0 && (
                      <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 bg-gray-50 sm:left-12">
                        {multiSelectButtons}
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
                          {tableColumnNames.map((column, i) => (
                            <th
                              key={i}
                              scope="col"
                              className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                            >
                              {column.name}
                            </th>
                          ))}
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                          >
                            <span className="sr-only">
                              {screenReaderRowButtonText}
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {/* table data */}
                        {tableData.map((item) => (
                          <tr
                            key={item.id}
                            className={
                              selectedlists.includes(item.id)
                                ? "bg-gray-50"
                                : undefined
                            }
                          >
                            <td className="relative px-7 sm:w-12 sm:px-6">
                              {selectedlists.includes(item.id) && (
                                <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                              )}
                              <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                value={item.id}
                                checked={selectedlists.includes(item.id)}
                                onChange={(e) =>
                                  setSelectedlists(
                                    e.target.checked
                                      ? [...selectedlists, item.id]
                                      : selectedlists.filter(
                                          (l) => l !== item.id
                                        )
                                  )
                                }
                              />
                            </td>
                            {tableColumnNames.map((column, i) => {
                              if (i === 0) {
                                return (
                                  <td
                                    key={i}
                                    className={formatClasses(
                                      "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                                      selectedlists.includes(item.id)
                                        ? "text-blue-600"
                                        : "text-gray-900"
                                    )}
                                  >
                                    <Link
                                      href={`${
                                        titleLink ? titleLink(item) : "#"
                                      }`}
                                      className="hover:text-blue-600"
                                    >
                                      {item[column.id] instanceof Date
                                        ? formatDateTime(item[column.id])
                                        : item[column.id]}
                                    </Link>
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={i}
                                    className="whitespace-nowrap py-4 pr-3 text-sm text-gray-500"
                                  >
                                    {column.id === "scheduledSend" &&
                                    (!item[column.id] ||
                                      (item[column.id] && item["hasSent"])) ? (
                                      "-"
                                    ) : column.id === "hasSent" ? (
                                      item[column.id] ? (
                                        <p className="w-14 rounded-full bg-green-100 p-1 text-center text-xs font-semibold text-green-800">
                                          Sent
                                        </p>
                                      ) : item["scheduledSend"] ? (
                                        <p className="w-20 rounded-full bg-orange-100 p-1 text-center text-xs font-semibold text-orange-800">
                                          Scheduled
                                        </p>
                                      ) : (
                                        <p className="w-14 rounded-full bg-gray-100 p-1 text-center text-xs font-semibold text-gray-700">
                                          Draft
                                        </p>
                                      )
                                    ) : item[column.id] instanceof Date ? (
                                      formatDateTime(item[column.id])
                                    ) : (
                                      item[column.id]
                                    )}
                                  </td>
                                );
                              }
                            })}

                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                              <button
                                className={`${
                                  rowActionHighlight
                                    ? "text-blue-600 hover:text-blue-700"
                                    : "text-gray-400 hover:text-gray-500"
                                }`}
                                onClick={() => {
                                  rowButtonActions(item);
                                }}
                              >
                                {rowButtonText}
                                <span className="sr-only">
                                  {item[primaryScreenReaderInfo]}
                                </span>
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
