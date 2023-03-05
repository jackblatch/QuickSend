import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { component } from "~/campaignEditor/utils/blockattributes";
import SortableItem from "./SortableItem";

export default function CampaignEditorEmailBody({
  blocks,
}: {
  blocks: component[];
}) {
  return (
    <SortableContext
      items={blocks} // blocks.map((item) => item.name)
      strategy={verticalListSortingStrategy}
    >
      {blocks.map((item) => {
        return (
          <div key={item.id}>
            {/* wip for adding hover effect */}
            {/* <div>{dragOver === item.id && <p>YES</p>}</div> */}
            <SortableItem id={item.id}>{item.element}</SortableItem>
          </div>
        );
      })}
    </SortableContext>
  );
}
