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
  newComponents,
}: {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
  newComponents: any;
}) {
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log("ACTIVE", active);
    console.log("OVER", over);
  };

  return (
    <>
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <EditEmailContainer title="components" items={newComponents} />
      <div className="flex flex-col items-center py-6">
        <DraggableEmailBlocksGroup />
      </div>
    </>
  );
}
