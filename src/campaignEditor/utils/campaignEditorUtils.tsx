import EmailButton from "../EmailButton";
import Spacer from "../Spacer";
import EmailImage from "../EmailImage";
import HeadingText from "../HeadingText";
import ParagraphText from "../ParagraphText";
import { blockAttributes } from "./blockattributes";

export const getDefaultAttributeValues = (componentName: string) => {
  return blockAttributes[componentName];
};

export const generateElement = (componentName: string, attributes: any) => {
  let element;
  if (componentName === "HeadingText") {
    element = <HeadingText {...attributes} />;
  } else if (componentName === "ParagraphText") {
    element = <ParagraphText {...attributes} />;
  } else if (componentName === "Button") {
    element = <EmailButton {...attributes} />;
  } else if (componentName === "Image") {
    element = <EmailImage {...attributes} />;
  } else if (componentName === "Spacer") {
    element = <Spacer {...attributes} />;
  }
  return element;
};

export const getIndexOfId = (id: string, blocks: any[]) =>
  blocks.map((item) => item.id).indexOf(id);

export const parseAndGenerateBlocks = (stringifiedBlocks: string) => {
  const blocks = JSON.parse(stringifiedBlocks);
  if (blocks) {
    const newBlocks = blocks.map((item: any) => {
      item.element = generateElement(item.componentName, item.attributes);
      return item;
    });
    return newBlocks;
  }
  return false;
};
