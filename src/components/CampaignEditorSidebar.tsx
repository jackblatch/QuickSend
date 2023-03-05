import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from "./DraggableComponent";
import DraggableEmailBlocksGroup from "./CampaignComponentIcons";
import CampaignComponentsGroup from "./CampaignComponentsGroup";
import LineTabs from "./LineTabs";
import Button from "./Button";
import { getIndexOfId } from "~/campaignEditor/utils/campaignEditorUtils";
import { blockInfo } from "~/campaignEditor/utils/blockattributes";

type Tabs = {
  name: string;
  current: boolean;
};

type isEditing = {
  blockId: string;
  current: boolean;
};

export default function CampaignEditorSidebar({
  tabs,
  setTabs,
  components,
  blocks,
  isEditing,
  setIsEditing,
}: {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
  components: any[];
  blocks: any[];
  isEditing: isEditing;
  setIsEditing: ({ blockId, current }: isEditing) => void;
}) {
  return (
    <>
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <div className="flex flex-col items-center justify-start p-6">
        <div className="mb-4 w-full">
          <h3 className="text-left text-sm font-semibold uppercase text-gray-700">
            {isEditing.current ? "Editing" : "Blocks"}
          </h3>
        </div>
        {isEditing.current ? (
          <div className="w-[400px] p-6">
            <div>
              {JSON.stringify(
                Object.entries(
                  blocks[getIndexOfId(isEditing.blockId, blocks)].attributes
                ).map((item: any, i) => {
                  blockInfo[item[1]]?.inputType === "text" ? (
                    <div key={i}>
                      {/* <p>LABEL: {blockInfo[identifier]?.label}</p> */}
                      <p>Text input {String(blockInfo[item[1]])}</p>
                      {/* <p>Current content: {String(value)}</p> */}
                    </div>
                  ) : (
                    ""
                  );
                })
              )}
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button appearance="secondary" size="md">
                Cancel
              </Button>
              <Button appearance="primary" size="md">
                Save
              </Button>
            </div>
          </div>
        ) : (
          <CampaignComponentsGroup title="components" items={components} />
        )}
      </div>
    </>
  );
}
