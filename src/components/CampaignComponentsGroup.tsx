import { useDroppable } from "@dnd-kit/core";
import DraggableComponent from "./DraggableComponent";

interface Props {
  title: string;
  items: { id: string; name: string }[];
}

export default function CampaignComponentsGroup({ title, items }: Props) {
  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      title,
      items,
    },
  }); // added 'data' obj in - not sure if necessary

  return (
    <div className="relative">
      <div className="relative z-[1] grid grid-cols-3 gap-8" ref={setNodeRef}>
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
      <div className="absolute top-0 grid grid-cols-3 gap-8">
        {items.map((_, i) => (
          <div key={i} className="h-24 w-24 rounded-md bg-gray-50"></div>
        ))}
      </div>
    </div>
  );
}
