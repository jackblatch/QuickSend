import { Dispatch, SetStateAction } from "react";
import formatClasses from "~/utils/formatClasses";

export default function LineTabs({
  tabs,
  setTabs,
}: {
  tabs: { name: string; current: boolean }[];
  setTabs: Dispatch<SetStateAction<any>>;
}) {
  console.log(tabs);
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex " aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => {
                  const newArr = tabs.map((t) => {
                    if (t.name === tab.name) {
                      return { ...t, current: true };
                    } else {
                      return { ...t, current: false };
                    }
                  });
                  setTabs(newArr);
                }}
                className={formatClasses(
                  tab.current
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "w-1/2 cursor-pointer border-b-2 py-4 px-1 text-center text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
