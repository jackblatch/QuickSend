import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { component } from "~/campaignEditor/utils/blockattributes";
import SortableItem from "./SortableItem";

export default function CampaignEditorEmailBody({
  blocks,
  isDragInProgress,
  handleDeleteBlock,
  setIsEditing,
  setEditorValues,
}: {
  blocks: component[];
  isDragInProgress: boolean;
  handleDeleteBlock: (id: string) => void;
  setEditorValues: React.Dispatch<React.SetStateAction<any>>;
  setIsEditing: ({
    blockId,
    current,
  }: {
    blockId: string;
    current: boolean;
    initialValues: any;
  }) => void;
}) {
  return (
    <SortableContext
      items={blocks} // blocks.map((item) => item.name)
      strategy={verticalListSortingStrategy}
    >
      {blocks.map((item) => {
        return (
          <div key={item.id} className={`${isDragInProgress ? "" : "group"}`}>
            <div className="mt-4 mb-2 hidden items-center justify-center gap-4 group-hover:flex">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => {
                  setIsEditing({
                    blockId: item.id,
                    current: true,
                    initialValues: item.attributes,
                  });
                  setEditorValues(item.attributes);
                }}
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => handleDeleteBlock(item.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>

            <SortableItem id={item.id}>{item.element}</SortableItem>
          </div>
        );
      })}
    </SortableContext>
  );
}
