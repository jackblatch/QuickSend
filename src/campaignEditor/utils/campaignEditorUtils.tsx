import EmailButton from "../EmailButton";
import Spacer from "../Spacer";
import EmailImage from "../EmailImage";
import HeadingText from "../HeadingText";
import ParagraphText from "../ParagraphText";
import { type BlockAttributes, blockAttributes } from "./blockattributes";
import List from "../List";
import NavBar from "../NavBar";

export const getDefaultAttributeValues = (
  componentName: keyof BlockAttributes
) => {
  // spreading into obj fixed [campaignId] edit page is undefined error
  return blockAttributes[componentName];
};

export const generateElement = (componentName: string, attributes: any) => {
  if (componentName === "HeadingText") {
    return <HeadingText {...attributes} />;
  } else if (componentName === "ParagraphText") {
    return <ParagraphText {...attributes} />;
  } else if (componentName === "Button") {
    return <EmailButton {...attributes} />;
  } else if (componentName === "Image") {
    return <EmailImage {...attributes} />;
  } else if (componentName === "Spacer") {
    return <Spacer {...attributes} />;
  } else if (componentName === "List") {
    return <List {...attributes} />;
  } else if (componentName === "NavBar" || componentName === "Social") {
    return <NavBar {...attributes} />;
  }
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
