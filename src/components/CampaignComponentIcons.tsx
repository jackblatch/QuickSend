import {
  Bars2Icon,
  Bars3BottomLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  CursorArrowRaysIcon,
  ListBulletIcon,
  MegaphoneIcon,
  PhotoIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

const iconStyles = "h-6 w-6";

export default function CampaignComponentIcons({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  return (
    <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 shadow">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="rounded-md border-2 border-gray-800 p-1">
          {id === "ParagraphText" ? (
            <Bars3BottomLeftIcon className={iconStyles} />
          ) : id === "Heading" ? (
            <ChatBubbleBottomCenterTextIcon className={iconStyles} />
          ) : id === "Image" ? (
            <PhotoIcon className={iconStyles} />
          ) : id === "NavBar" ? (
            <ViewColumnsIcon className={iconStyles} />
          ) : id === "Button" ? (
            <CursorArrowRaysIcon className={iconStyles} />
          ) : id === "Social" ? (
            <MegaphoneIcon className={iconStyles} />
          ) : id === "Spacing" ? (
            <Bars2Icon className={iconStyles} />
          ) : id === "List" ? (
            <ListBulletIcon className={iconStyles} />
          ) : (
            ""
          )}
        </div>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
}
