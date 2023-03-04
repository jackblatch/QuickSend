import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableComponent({
  title,
  index,
  parent,
  itemId,
}: {
  title: string;
  index: number;
  parent: string;
  itemId: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemId,
    data: {
      title,
      itemId,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div style={style} {...listeners} {...attributes} ref={setNodeRef}>
      <p>{title}</p>
    </div>
  );
}
