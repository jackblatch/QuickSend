import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type Block } from "~/campaignEditor/utils/blockattributes";
import SortableItem from "./SortableItem";

export default function CampaignEditorEmailBody({
  blocks,
  isDragInProgress,
  handleDeleteBlock,
  setIsEditing,
  isEditing,
  setEditorValues,
}: {
  blocks: Block[];
  isDragInProgress: boolean;
  handleDeleteBlock: (id: string) => void;
  setEditorValues: React.Dispatch<React.SetStateAction<any>>;
  isEditing: {
    blockId: string;
    current: boolean;
    initialValues: any;
  };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      blockId: string;
      current: boolean;
      initialValues: any;
    }>
  >;
}) {
  return (
    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
      {blocks.map((item) => {
        return (
          <div
            key={item.id}
            className={`${isDragInProgress ? "" : "group"} ${
              isEditing && isEditing.blockId === item.id
                ? "border-2 border-dashed border-blue-600"
                : ""
            }`}
          >
            <div className="mt-4 mb-2 hidden items-center justify-center gap-4 group-hover:flex">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
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
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
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
