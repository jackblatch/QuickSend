import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

const iconStyles = "h-6 w-6";

// function DraggableEmailBlocksGroup() {
//   return (
//     <div className="grid  grid-cols-3 gap-8">
//       <ParagraphText />
//       <ParagraphText />
//       <ParagraphText />
//       <ParagraphText />
//     </div>
//   );
// }

export default function DraggableEmailBlock({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  console.log(name, id);
  return (
    <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 shadow">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="rounded-md border-2 border-gray-800 p-1">
          {id === "ParagraphText" && (
            <Bars3BottomLeftIcon className={iconStyles} />
          )}
        </div>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
}

// function ParagraphText() {
//   return (
//     <DraggableEmailBlock name="Text">
//       <Bars3BottomLeftIcon className={iconStyles} />
//     </DraggableEmailBlock>
//   );
// }
