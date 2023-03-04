import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from "./DraggableComponent";
import DraggableEmailBlocksGroup from "./DraggableEmailBlocksGroup";
import EditEmailContainer from "./EditEmailContainer";
import LineTabs from "./LineTabs";

type Tabs = {
  name: string;
  current: boolean;
};

export default function CampaignEditorSidebar({
  tabs,
  setTabs,
  components,
}: {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
  components: any;
}) {
  return (
    <>
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <div className="flex flex-col items-center justify-start p-6">
        <div className="mb-4 w-full">
          <h3 className="text-left text-sm font-semibold uppercase text-gray-700">
            Blocks
          </h3>
        </div>
        <EditEmailContainer title="components" items={components} />
      </div>
    </>
  );
}
