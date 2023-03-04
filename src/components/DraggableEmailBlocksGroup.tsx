import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

const iconStyles = "h-6 w-6";

export default function DraggableEmailBlocksGroup() {
  return (
    <div className="grid  grid-cols-3 gap-8">
      <ParagraphText />
      <ParagraphText />
      <ParagraphText />
      <ParagraphText />
    </div>
  );
}

function DraggableEmailBlock({
  children,
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 shadow">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="rounded-md border-2 border-gray-800 p-1">
          {children}
        </div>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
}

function ParagraphText() {
  return (
    <DraggableEmailBlock name="Text">
      <Bars3BottomLeftIcon className={iconStyles} />
    </DraggableEmailBlock>
  );
}
