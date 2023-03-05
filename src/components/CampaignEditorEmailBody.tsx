import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function CampaignEditorEmailBody({
  blocks,
}: {
  blocks: { id: string; name: string }[];
}) {
  return (
    <SortableContext
      items={blocks.map((item) => item.name)}
      strategy={verticalListSortingStrategy}
    >
      {blocks.map((item) => {
        return (
          <div key={item.id}>
            {/* wip for adding hover effect */}
            {/* <div>{dragOver === item.id && <p>YES</p>}</div> */}
            <SortableItem id={item.id}>{item.name}</SortableItem>
          </div>
        );
      })}
    </SortableContext>
  );
}
