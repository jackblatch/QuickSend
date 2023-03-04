import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export default function Droppable({ items }: { items: any[] }) {
  const { setNodeRef } = useDroppable({
    id: "droppable-area",
  });

  return (
    <div ref={setNodeRef}>
      {items.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}
