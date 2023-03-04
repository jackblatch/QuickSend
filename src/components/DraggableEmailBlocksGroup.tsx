import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

const iconStyles = "h-6 w-6";

export default function DraggableEmailBlocksGroup() {
  return (
    <div className="grid  grid-cols-3 gap-8">
      {/* <ParagraphText />
      <ParagraphText />
      <ParagraphText />
      <ParagraphText /> */}
    </div>
  );
}

function DraggableEmailBlock({
  children,
  name,
  parent,
  index,
}: PropsWithChildren<{ name: string; parent: any; index: any }>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name,
    data: {
      name,
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div style={style}>
      <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 shadow">
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <div className="rounded-md border-2 border-gray-800 p-1">
            {children}
          </div>
          <p className="text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
}

export function ParagraphText({
  parent,
  index,
}: {
  parent: string;
  index: string;
}) {
  return (
    <DraggableEmailBlock name="Text" parent={parent} index={index}>
      <Bars3BottomLeftIcon className={iconStyles} />
    </DraggableEmailBlock>
  );
}
