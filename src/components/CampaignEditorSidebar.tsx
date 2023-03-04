import DraggableEmailBlocksGroup from "./DraggableEmailBlocksGroup";
import LineTabs from "./LineTabs";

type Tabs = {
  name: string;
  current: boolean;
};

export default function CampaignEditorSidebar({
  tabs,
  setTabs,
}: {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
}) {
  return (
    <>
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <div className="flex flex-col items-center py-6">
        <DraggableEmailBlocksGroup />
      </div>
    </>
  );
}
