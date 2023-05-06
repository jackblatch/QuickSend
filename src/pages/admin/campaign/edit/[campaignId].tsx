import { v4 as uuidv4 } from "uuid";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import CampaignEditNavBar from "~/components/CampaignEditNavBar";
import CampaignEditorSidebar from "~/components/CampaignEditorSidebar";
import { arrayMove } from "@dnd-kit/sortable";
import CampaignEditorEmailBody from "~/components/CampaignEditorEmailBody";
import {
  generateElement,
  getDefaultAttributeValues,
  parseAndGenerateBlocks,
} from "~/campaignEditor/utils/campaignEditorUtils";
import { toast, Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import { Block } from "~/campaignEditor/utils/blockattributes";
import renderToHtml from "~/campaignEditor/utils/renderToHtml";
import Head from "next/head";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import EditorCommandPalette from "~/campaignEditor/EditorCommandPalette";
import EmailPreviewModal from "~/campaignEditor/EmailPreviewModal";
import getServerSideProps from "~/utils/handleSessionRedirect";
import { useSession } from "next-auth/react";
import Loading from "~/components/Loading";

export { getServerSideProps };

export default function CampaignBuilder() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isPreviewEmailModalOpen, setIsPreviewEmailModalOpen] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const [isExampleBuilder, setIsExampleBuilder] = useState(false);
  const [isDragInProgress, setIsDragInProgress] = useState(false);
  const [isEditing, setIsEditing] = useState({
    blockId: "",
    current: false,
    initialValues: {},
  });
  const [editorValues, setEditorValues] = useState();

  const [tabs, setTabs] = useState([
    {
      name: "Content",
      current: true,
    },
    { name: "Global Styles", current: false },
  ]);

  const getCampaignEditorInfo = api.campaigns.getCampaignEditorInfo.useQuery(
    {
      campaignId: router.query.campaignId as string,
      isExampleBuilder,
    },
    {
      enabled: !isExampleBuilder,
    }
  );

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "1",
      element: generateElement("HeadingText", {
        ...getDefaultAttributeValues("HeadingText"),
      }),
      componentName: "HeadingText",
      attributes: getDefaultAttributeValues("HeadingText"),
    },
  ]);

  useEffect(() => {
    if (router.isReady && router.query.campaignId === "example-builder") {
      setIsExampleBuilder(true);
    }
  }, [router]);

  const [components, setComponents] = useState<any>([
    { id: "HeadingText", name: "Heading" },
    { id: "ParagraphText", name: "Body Text" },
    { id: "List", name: "List" },
    { id: "NavBar", name: "NavBar" },
    { id: "Button", name: "Button" },
    { id: "Image", name: "Image" },
    { id: "Spacer", name: "Spacer" },
    { id: "Social", name: "Social Links" },
  ]);

  const [globalStyles, setGlobalStyles] = useState({
    fontFamily: "Arial, Helvetica, sans-serif",
  });

  useEffect(() => {
    if (getCampaignEditorInfo.data && blocks?.length === 1) {
      const newBlocks = parseAndGenerateBlocks(
        getCampaignEditorInfo.data.blocks as string
      );
      if (newBlocks) {
        setBlocks(newBlocks);
      }
      const globalStyles = JSON.parse(
        getCampaignEditorInfo.data.globalStyles as string
      );
      if (globalStyles) {
        setGlobalStyles(globalStyles);
      }
    }
  }, [getCampaignEditorInfo.data]);

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.metaKey && e.code === "KeyK") {
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!router.isReady && !session) {
    return <Loading />;
  }

  function handleSortableDragEnd(event: any) {
    setIsDragInProgress(false);
    const { active, over } = event;

    const activeIsInBlocksArray = blocks.some(
      (block) => block.id === active.id
    );

    if (active.id !== over.id) {
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
            const uniqueId = uuidv4();
            const currentItem = components.filter(
              (comp: any) => comp.id === active.id
            );

            const componentName = currentItem[0].id;
            const attributes = getDefaultAttributeValues(componentName);

            setIsEditing({
              blockId: uniqueId,
              current: true,
              initialValues: attributes,
            });

            setEditorValues(attributes as any);

            return arrayMove(
              [
                ...items,
                {
                  id: uniqueId,
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
      setIsEditing({
        blockId: "",
        current: false,
        initialValues: {},
      });
      setBlocks((items) => {
        return items.filter((item) => item.id !== id);
      });
      toast.success("Block deleted", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Head>
        <title>{`Edit ${
          getCampaignEditorInfo?.data?.name ?? "Campaign"
        } - QuickSend`}</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      {!isExampleBuilder && (
        <EmailPreviewModal
          open={isPreviewEmailModalOpen}
          setOpen={setIsPreviewEmailModalOpen}
          subject={getCampaignEditorInfo.data?.subject ?? ""}
          sendFromName={getCampaignEditorInfo.data?.sendFromName ?? ""}
          htmlContentFunc={() => renderToHtml(blocks, globalStyles)}
        />
      )}
      <EditorCommandPalette
        open={isCommandPaletteOpen}
        setOpen={setIsCommandPaletteOpen}
        setBlocks={setBlocks}
        components={components}
        setIsEditing={setIsEditing}
        setEditorValues={setEditorValues}
      />
      <DndContext
        modifiers={[restrictToWindowEdges]}
        collisionDetection={closestCenter}
        onDragStart={() => {
          setIsDragInProgress(true);
        }}
        onDragEnd={handleSortableDragEnd}
        id="1"
      >
        <div className="flex min-h-[100vh] flex-col">
          <CampaignEditNavBar
            isExampleBuilder={isExampleBuilder}
            router={router}
            blocks={blocks}
            campaignName={getCampaignEditorInfo?.data?.name ?? ""}
            globalStyles={globalStyles}
          />
          <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-0">
            <div className="border-r border-gray-200 bg-white py-2 lg:min-w-[400px] lg:max-w-[400px]">
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
                globalStyles={globalStyles}
                setGlobalStyles={setGlobalStyles}
              />
            </div>
            <div className="max-h-[calc(100vh-117px)] flex-1 overflow-auto bg-gray-200">
              <div className="sticky top-0 flex h-[62px] w-full items-center justify-between border-b border-gray-200 bg-white px-6">
                <p className="rounded-md bg-gray-100 p-2 text-xs">
                  Tip: Access the command palette with ⌘K
                </p>
                {!isExampleBuilder && (
                  <Button
                    appearance="secondary"
                    size="sm"
                    onClick={() => setIsPreviewEmailModalOpen(true)}
                  >
                    Send Preview
                  </Button>
                )}
              </div>
              <div className="flex justify-center py-12">
                <div className="min-w-[600px] max-w-[600px] bg-gray-200">
                  {!isExampleBuilder && getCampaignEditorInfo.isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div style={globalStyles}>
                      <CampaignEditorEmailBody
                        blocks={blocks}
                        isDragInProgress={isDragInProgress}
                        handleDeleteBlock={handleDeleteBlock}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                        setEditorValues={setEditorValues}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 border-t border-gray-200 bg-white p-2 px-4 text-xs text-gray-600">
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
    </>
  );
}
