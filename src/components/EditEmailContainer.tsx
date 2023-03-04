import { useDroppable } from "@dnd-kit/core";
import DraggableComponent from "./DraggableComponent";

interface KanbanLaneProps {
  title: string;
  items: { id: string; name: string }[];
}

export default function EditEmailContainer({ title, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div>
      <div className="flex flex-col" ref={setNodeRef}>
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
