import { useDroppable } from "@dnd-kit/core";
import DraggableComponent from "./DraggableComponent";

interface Props {
  title: string;
  items: { id: string; name: string }[];
}

export default function CampaignComponentsGroup({ title, items }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
    data: {
      title,
      items,
    },
  }); // added 'data' obj in - not sure if necessary

  return (
    <div>
      <div className="grid  grid-cols-3 gap-8" ref={setNodeRef}>
        {items.map((item, key) => (
          <DraggableComponent
            title={item.name}
            itemId={item.id}
            key={key}
            index={key}
            parent={title}
          />
        ))}
      </div>
    </div>
  );
}
