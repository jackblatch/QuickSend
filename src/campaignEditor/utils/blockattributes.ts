import { type ReactNode } from "react";

export type Block = {
  id: string;
  element: ReactNode;
  componentName: string;
  attributes: Record<string, any>;
};

export type HeadingTextProps = {
  text: string;
  backgroundColor: string;
  textColor: string;
  justifyContent: string;
  headingSize: "h1" | "h2" | "h3" | "h4";
  fontWeight: string;
  padding: string;
};

export type NavBarProps = {
  column1Text: string;
  column1Link: string;
  column2Text: string;
  column2Link: string;
  column3Text: string;
  column3Link: string;
  backgroundColor: string;
  textColor: string;
  fontWeight: string;
  padding: string;
};

export type ParagraphTextProps = {
  paragraphText: string;
  backgroundColor: string;
  textColor: string;
  justifyContent: string;
  fontWeight: string;
  padding: string;
};

export type ButtonProps = {
  text: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  backgroundColor: string;
  fontWeight: string;
  URLAddress: string;
  buttonPadding: string;
  outerPadding: string;
  borderRadius: string;
};

export type ImageProps = {
  src: string;
  alt: string;
  padding: string;
  backgroundColor: string;
};

export type SpacerProps = {
  backgroundColor: string;
  spacing: string;
};

export type ListProps = {
  listType: string;
  paragraphText: string;
  backgroundColor: string;
  textColor: string;
  justifyContent: string;
  fontWeight: string;
  padding: string;
};

// type BlockAttributes =
//   | HeadingTextProps
//   | ParagraphTextProps
//   | ButtonProps
//   | ImageProps
//   | SpacerProps
//   | ListProps
//   | NavBarProps;

export type BlockAttributes = {
  HeadingText: HeadingTextProps;
  ParagraphText: ParagraphTextProps;
  Button: ButtonProps;
  Image: ImageProps;
  Spacer: SpacerProps;
  List: ListProps;
  NavBar: NavBarProps;
  Social: NavBarProps;
};

export const blockAttributes: BlockAttributes = {
  HeadingText: {
    text: "Add text here",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    justifyContent: "left",
    headingSize: "h1",
    fontWeight: "bold",
    padding: "10px",
  },
  ParagraphText: {
    paragraphText: "Add text here",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    justifyContent: "left",
    fontWeight: "normal",
    padding: "10px",
  },
  Button: {
    text: "Your button text",
    buttonBackgroundColor: "#000000",
    buttonTextColor: "#ffffff",
    backgroundColor: "#ffffff",
    fontWeight: "normal",
    URLAddress: "",
    buttonPadding: "10px",
    outerPadding: "10px",
    borderRadius: "5px",
  },
  Image: {
    src: "",
    alt: "",
    padding: "10px",
    backgroundColor: "#ffffff",
  },
  Spacer: {
    backgroundColor: "#ffffff",
    spacing: "40px",
  },
  List: {
    listType: "unordered",
    paragraphText: "Add your list here",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    justifyContent: "left",
    fontWeight: "normal",
    padding: "10px",
  },
  NavBar: {
    column1Text: "First column",
    column1Link: "",
    column2Text: "Second column",
    column2Link: "",
    column3Text: "Third column",
    column3Link: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontWeight: "normal",
    padding: "10px",
  },
  Social: {
    column1Text: "Instagram",
    column1Link: "",
    column2Text: "Facebook",
    column2Link: "",
    column3Text: "Youtube",
    column3Link: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontWeight: "normal",
    padding: "10px",
  },
};

type BlockInfo = {
  inputType: string;
  label: string;
  options?: string[];
};

export const blockInfo: { [index: string]: BlockInfo } = {
  column1Link: { inputType: "text", label: "Column 1 Link" },
  column2Link: { inputType: "text", label: "Column 2 Link" },
  column3Link: { inputType: "text", label: "Column 3 Link" },
  listType: {
    inputType: "select",
    label: "List Type",
    options: ["unordered", "ordered"],
  },
  borderRadius: {
    inputType: "select",
    label: "Border Radius (px)",
    options: ["0px", "5px", "10px", "20px"],
  },
  buttonPadding: {
    inputType: "select",
    label: "Button Padding (px)",
    options: ["5px 10px", "10px 20px", "20px 40px"],
  },
  outerPadding: {
    inputType: "select",
    label: "Outer Padding (px)",
    options: ["10px", "20px", "30px"],
  },
  padding: {
    inputType: "select",
    label: "Padding (px)",
    options: ["0px", "10px", "20px", "30px"],
  },
  spacing: {
    inputType: "select",
    label: "Spacing (px)",
    options: ["10px", "20px", "30px", "40px"],
  },
  text: { inputType: "text", label: "Text" },
  column1Text: { inputType: "text", label: "Column 1 Text" },
  column2Text: { inputType: "text", label: "Column 2 Text" },
  column3Text: { inputType: "text", label: "Column 3 Text" },
  alt: { inputType: "text", label: "Alt Text" },
  src: { inputType: "file", label: "Image" },
  URLAddress: { inputType: "text", label: "URL Address" },
  backgroundColor: {
    inputType: "color",
    label: "Background Color",
  },
  buttonBackgroundColor: {
    inputType: "color",
    label: "Button Background Color",
  },
  textColor: { inputType: "color", label: "Text Color" },
  buttonTextColor: { inputType: "color", label: "Button Text Color" },
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
