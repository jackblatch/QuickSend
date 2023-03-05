import { v4 as uuidv4 } from "uuid";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import CampaignEditNavBar from "~/components/CampaignEditNavBar";
import CampaignEditorSidebar from "~/components/CampaignEditorSidebar";
import { arrayMove } from "@dnd-kit/sortable";
import SortableItem from "~/components/SortableItem";
import CampaignEditorEmailBody from "~/components/CampaignEditorEmailBody";
import HeadingText from "~/campaignEditor/HeadingText";
import {
  generateElement,
  getDefaultAttributeValues,
} from "~/campaignEditor/utils/campaignEditorUtils";
import { toast, Toaster } from "react-hot-toast";

export default function CampaignBuilder() {
  const router = useRouter();

  const [tabs, setTabs] = useState([
    {
      name: "Content",
      current: true,
    },
    { name: "Global Styles", current: false },
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>();
  const [isDragInProgress, setIsDragInProgress] = useState(false);
  const [isEditing, setIsEditing] = useState({
    blockId: "",
    current: false,
    initialValues: {},
  });
  const [editorValues, setEditorValues] = useState();

  const [blocks, setBlocks] = useState<any[]>([
    {
      id: "1",
      element: <HeadingText {...getDefaultAttributeValues("HeadingText")} />,
      componentName: "HeadingText",
      attributes: getDefaultAttributeValues("HeadingText"),
    },
  ]);

  const [components, setComponents] = useState<any>([
    { id: "HeadingText", name: "Heading" },
    { id: "ParagraphText", name: "Body Text" },
    { id: "List", name: "List" },
    { id: "NavBar", name: "NavBar" },
    { id: "Button", name: "Button" },
    { id: "Image", name: "Image" },
    { id: "Spacing", name: "Spacing" },
    { id: "Social", name: "Social Links" },
  ]);

  console.log({ blocks });

  function handleSortableDragEnd(event: any) {
    setIsDragInProgress(false);
    const { active, over } = event;

    const activeIsInBlocksArray = blocks.some(
      (block) => block.id === active.id
    );

    if (active.id !== over.id) {
      setActiveId(undefined);

      setBlocks((items) => {
        const activeIndex = items
          .map((mapItem) => mapItem.id)
          .indexOf(active.id);
        const overIndex = items.map((mapItem) => mapItem.id).indexOf(over.id);
        if (activeIsInBlocksArray) {
          return arrayMove(items, activeIndex, overIndex);
        } else {
          if (over.id === "components") {
            return items;
          } else {
            const currentItem = components.filter(
              (comp: any) => comp.id === active.id
            );
            const componentName = currentItem[0].id;
            const attributes = getDefaultAttributeValues(componentName);
            return arrayMove(
              [
                ...items,
                {
                  id: uuidv4(),
                  element: generateElement(componentName, attributes),
                  componentName: componentName,
                  attributes: attributes,
                },
              ],
              activeIndex,
              overIndex
            );
          }
        }
      });
    }
  }

  const handleDeleteBlock = (id: string) => {
    if (blocks.length === 1) {
      toast.error("You must have at least one block", {
        position: "bottom-center",
      });
    } else {
      setBlocks((items) => {
        return items.filter((item) => item.id !== id);
      });
      toast.success("Block deleted", {
        position: "bottom-center",
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(e) => {
        setActiveId(e.active.id);
        setIsDragInProgress(true);
      }}
      onDragEnd={handleSortableDragEnd}
      id="1"
    >
      <Toaster />
      <div className="flex min-h-[100vh] flex-col">
        <CampaignEditNavBar router={router} blocks={blocks} />
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-0">
          <div className="min-w-[400px] max-w-[400px] border-r border-gray-200 bg-white py-2">
            <CampaignEditorSidebar
              tabs={tabs}
              setTabs={setTabs}
              components={components}
              blocks={blocks}
              setBlocks={setBlocks}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editorValues={editorValues}
              setEditorValues={setEditorValues}
            />
          </div>
          <div className="flex-1 bg-gray-50">
            <div className="flex h-[62px] items-center justify-end border-b border-gray-200 bg-white px-6">
              <Button appearance="secondary" size="sm">
                Send Preview
              </Button>
            </div>
            <div className="flex justify-center pt-12">
              <div className="min-w-[600px] max-w-[600px] bg-gray-200">
                <CampaignEditorEmailBody
                  blocks={blocks}
                  isDragInProgress={isDragInProgress}
                  handleDeleteBlock={handleDeleteBlock}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  setEditorValues={setEditorValues}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-white p-2 text-xs text-gray-600">
          <p>Support</p>
          <p>Documentation</p>
        </div>
      </div>
      {/* <DragOverlay>
        {activeId && blocks.some((item) => item.id === activeId) ? (
          <SortableItem id={String(activeId)}>
            {blocks.find((item) => item.id === activeId)?.name ||
              components.find((item: any) => item.id === activeId)?.name}
          </SortableItem>
        ) : null}
      </DragOverlay> */}
    </DndContext>
  );
}
