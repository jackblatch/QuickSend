import { ReactNode } from "react";

export type component = {
  id: string;
  element: ReactNode;
  componentName: string;
  attributes: any;
};

export type HeadingTextProps = {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  justifyContent?: string;
  headingSize?: string;
  fontWeight?: string;
};

export type ParagraphTextProps = {
  paragraphText?: string;
  backgroundColor?: string;
  textColor?: string;
  justifyContent?: string;
  fontWeight?: string;
};

type BlockAttributes = HeadingTextProps | ParagraphTextProps;

// separation of concerns - values need to be stored in different object to how the application uses those values

export const blockAttributes: { [index: string]: BlockAttributes } = {
  HeadingText: {
    text: "Add text here",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    justifyContent: "left",
    headingSize: "h1",
    fontWeight: "bold",
  },
  ParagraphText: {
    paragraphText: "Add text here",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    justifyContent: "left",
    fontWeight: "normal",
  },
};

type BlockInfo = {
  inputType: string;
  label: string;
  options?: string[];
};

export const blockInfo: { [index: string]: BlockInfo } = {
  text: { inputType: "text", label: "Text" },
  backgroundColor: {
    inputType: "color",
    label: "Background Color",
  },
  textColor: { inputType: "color", label: "Text Color" },
  justifyContent: {
    inputType: "select",
    label: "Justify Content",
    options: ["left", "center", "right"],
  },
  headingSize: {
    inputType: "select",
    label: "Heading Size",
    options: ["h1", "h2", "h3", "h4"],
  },
  fontWeight: {
    inputType: "select",
    label: "Font Weight",
    options: ["normal", "bold"],
  },
  paragraphText: {
    inputType: "textarea",
    label: "Text",
  },
};
