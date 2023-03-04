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
      <EditEmailContainer title="components" items={components} />
      <div className="flex flex-col items-center py-6">
        <DraggableEmailBlocksGroup />
      </div>
    </>
  );
}
