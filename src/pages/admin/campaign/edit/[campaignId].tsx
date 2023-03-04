import {
  closestCenter,
  DndContext,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "~/components/Button";
import CampaignEditNavBar from "~/components/CampaignEditNavBar";
import CampaignEditorSidebar from "~/components/CampaignEditorSidebar";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "~/components/SortableItem";

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
  const [dragOver, setDragOver] = useState<UniqueIdentifier | undefined>();

  const [blocks, setBlocks] = useState([
    { id: "joh", name: "john" },
    { id: "jer", name: "Jeremy" },
    { id: "t", name: "Tim" },
    { id: "M", name: "Matt" },
  ]);

  const [components, setComponents] = useState<any>([
    { id: "Heading", name: "Heading" },
    { id: "ParagraphText", name: "Body Text" },
    { id: "List", name: "List" },
    { id: "NavBar", name: "NavBar" },
    { id: "Button", name: "Button" },
    { id: "Image", name: "Image" },
    { id: "Spacing", name: "Spacing" },
    { id: "Social", name: "Social Links" },
  ]);

  function handleSortableDragEnd(event: any) {
    const { active, over } = event;

    const activeIsInBlocksArray = blocks.some(
      (block) => block.id === active.id
    );

    if (active.id !== over.id) {
      setActiveId(undefined);
      if (activeIsInBlocksArray) {
        setBlocks((items) => {
          const activeIndex = items
            .map((mapItem) => mapItem.id)
            .indexOf(active.id);
          const overIndex = items.map((mapItem) => mapItem.id).indexOf(over.id);
          return arrayMove(items, activeIndex, overIndex);
        });
      } else {
        const currentItem = components.filter(
          (comp: any) => comp.id === active.id
        );
        setBlocks((items) => {
          const activeIndex = items
            .map((mapItem: any) => mapItem.id)
            .indexOf(active.id);
          const overIndex = items.map((mapItem) => mapItem.id).indexOf(over.id);

          if (over.id === "components") {
            return items;
          } else {
            return arrayMove(
              [
                ...items,
                { id: String(Math.random() * 200), name: currentItem[0].name },
              ],
              activeIndex,
              overIndex
            );
          }
        });
      }
    }
  }

  return (
    <DndContext
      // modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={handleSortableDragEnd}
      onDragOver={(e: any) => {
        // console.log("running");
        setDragOver(e.active.id);
      }}
      id="1"
    >
      <div className="flex min-h-[100vh] flex-col">
        <CampaignEditNavBar router={router} />
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-0">
          <div className="min-w-[400px] max-w-[400px] border-r border-gray-200 bg-white py-2">
            <CampaignEditorSidebar
              tabs={tabs}
              setTabs={setTabs}
              components={components}
            />
          </div>
          <div className="flex-1 bg-gray-50">
            <div className="flex h-[62px] items-center justify-end border-b border-gray-200 bg-white px-6">
              <Button appearance="secondary" size="sm">
                Send Preview
              </Button>
            </div>
            <div className="flex justify-center pt-12">
              <div className="min-w-[600px] max-w-[600px] bg-red-500">
                <SortableContext
                  items={blocks.map((item) => item.name)}
                  strategy={verticalListSortingStrategy}
                >
                  {blocks.map((item) => {
                    return (
                      <div key={item.id}>
                        {/* wip for adding hover effect */}
                        {/* <div>{dragOver === item.id && <p>YES</p>}</div> */}
                        <SortableItem id={item.id}>{item.name}</SortableItem>
                      </div>
                    );
                  })}
                </SortableContext>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-white p-2 text-xs text-gray-600">
          <p>Support</p>
          <p>Documentation</p>
        </div>
      </div>
      <DragOverlay>
        {activeId && blocks.some((item) => item.id === activeId) ? (
          <SortableItem id={String(activeId)}>
            {blocks.find((item) => item.id === activeId)?.name ||
              components.find((item: any) => item.id === activeId)?.name}
          </SortableItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
