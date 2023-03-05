import CampaignComponentsGroup from "./CampaignComponentsGroup";
import LineTabs from "./LineTabs";
import Button from "./Button";
import {
  generateElement,
  getIndexOfId,
} from "~/campaignEditor/utils/campaignEditorUtils";
import { blockInfo } from "~/campaignEditor/utils/blockattributes";
import EditorInputField from "~/campaignEditor/EditorInputField";
import { useEffect, useState } from "react";

type Tabs = {
  name: string;
  current: boolean;
};

type isEditing = {
  blockId: string;
  current: boolean;
  initialValues: any;
};

const initialIsEditingValues = {
  blockId: "",
  current: false,
  initialValues: {},
};

export default function CampaignEditorSidebar({
  tabs,
  setTabs,
  components,
  blocks,
  setBlocks,
  isEditing,
  setIsEditing,
  setEditorValues,
  editorValues,
}: {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
  components: any[];
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  isEditing: isEditing;
  setIsEditing: ({ blockId, current }: isEditing) => void;
  editorValues: any;
  setEditorValues: React.Dispatch<React.SetStateAction<any>>;
}) {
  console.log({ editorValues });

  const handleUpdateComponent = (newEditorValues: any) => {
    const newBlocks = [...blocks];
    const indexOfId = getIndexOfId(isEditing.blockId, blocks);
    const componentName = newBlocks[indexOfId].componentName;
    newBlocks[indexOfId].attributes = {
      ...newEditorValues,
    };
    newBlocks[indexOfId].element = generateElement(
      componentName,
      newEditorValues
    );
    setBlocks(newBlocks);
  };

  return (
    <>
      <LineTabs tabs={tabs} setTabs={setTabs} />
      <div className="flex flex-col items-center justify-start p-6">
        <div className="mb-4 w-full">
          <h3 className="text-left text-sm font-semibold uppercase text-gray-700">
            {isEditing.current ? "Editing" : "Blocks"}
          </h3>
        </div>
        {isEditing.current ? (
          <div className="w-[400px] p-6">
            <div className="flex flex-col justify-start gap-6">
              {Object.entries(
                blocks[getIndexOfId(isEditing.blockId, blocks)].attributes
              ).map(([indentifier], i) => {
                return (
                  <div key={i}>
                    {blockInfo[indentifier]?.inputType === "text" ||
                    blockInfo[indentifier]?.inputType === "color" ? (
                      <>
                        <EditorInputField
                          type={String(blockInfo[indentifier]?.inputType)}
                          label={String(blockInfo[indentifier]?.label)}
                          id={indentifier}
                          value={editorValues[indentifier]}
                          onChange={(e: any) => {
                            setEditorValues((prev: any) => {
                              const newEditorValues = {
                                ...prev,
                                [indentifier]: e.target.value,
                              };
                              handleUpdateComponent(newEditorValues);
                              return newEditorValues;
                            });
                          }}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                appearance="secondary"
                size="md"
                onClick={() => {
                  handleUpdateComponent(isEditing.initialValues);
                  setIsEditing(initialIsEditingValues);
                }}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                size="md"
                onClick={() => {
                  setIsEditing(initialIsEditingValues);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <CampaignComponentsGroup title="components" items={components} />
        )}
      </div>
    </>
  );
}
