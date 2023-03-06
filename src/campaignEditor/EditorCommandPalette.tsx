import { v4 as uuidv4 } from "uuid";
import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  CalendarIcon,
  CodeBracketIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  LinkIcon,
  PencilSquareIcon,
  PhotoIcon,
  TableCellsIcon,
  VideoCameraIcon,
  ViewColumnsIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import formatClasses from "~/utils/formatClasses";
import {
  generateElement,
  getDefaultAttributeValues,
} from "./utils/campaignEditorUtils";
import CampaignComponentIcons from "~/components/CampaignComponentIcons";

const items = [
  {
    id: 1,
    name: "Text",
    description: "Add text.",
    url: "#",
    color: "bg-blue-500",
    icon: PencilSquareIcon,
  },
];

// change items to work with adding new component of specified search to bottom of page

export default function EditorCommandPalette({
  open,
  setOpen,
  setBlocks,
  components,
  setEditorValues,
  setIsEditing,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  components: { id: string; name: string }[];
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      blockId: string;
      current: boolean;
      initialValues: {};
    }>
  >;
  setEditorValues: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [query, setQuery] = useState("");

  const addNewBlock = (selectedComponent: { id: string; name: string }) => {
    const attributes = getDefaultAttributeValues(selectedComponent.id);
    const uniqueId = uuidv4();

    const obj = {
      id: uniqueId,
      element: generateElement(selectedComponent.id, attributes),
      componentName: selectedComponent.id,
      attributes: attributes,
    };
    setBlocks((prev: any) => [...prev, obj]);

    setIsEditing({
      blockId: uniqueId,
      current: true,
      initialValues: attributes!,
    });

    setEditorValues(attributes as any);
  };

  const filteredItems =
    query === ""
      ? components
      : components.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(item: any) => {
                  addNewBlock(item);
                  setOpen(false);
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-96 scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                          formatClasses(
                            "flex cursor-default select-none rounded-xl p-3",
                            active ? "bg-gray-100" : ""
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div
                              className={formatClasses(
                                "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                                "bg-blue-100"
                              )}
                            >
                              <CampaignComponentIcons
                                id={item.id}
                                iconOnly={true}
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-4 flex-auto">
                              <p
                                className={formatClasses(
                                  "text-sm font-medium",
                                  active ? "text-gray-900" : "text-gray-700"
                                )}
                              >
                                {item.name}
                              </p>
                              <p
                                className={formatClasses(
                                  "text-sm",
                                  active ? "text-gray-700" : "text-gray-500"
                                )}
                              >
                                {item.name}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredItems.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <ExclamationCircleIcon
                      type="outline"
                      name="exclamation-circle"
                      className="mx-auto h-6 w-6 text-gray-400"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No results found
                    </p>
                    <p className="mt-2 text-gray-500">
                      No components found for this search term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
