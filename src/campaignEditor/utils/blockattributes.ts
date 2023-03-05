import { ReactNode } from "react";

export type Block = {
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
  padding?: string;
};

export type ParagraphTextProps = {
  paragraphText?: string;
  backgroundColor?: string;
  textColor?: string;
  justifyContent?: string;
  fontWeight?: string;
};

export type ButtonProps = {
  text?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  backgroundColor?: string;
  fontWeight?: string;
  URLAddress?: string;
  buttonPadding?: string;
  outerPadding?: string;
  borderRadius?: string;
};

export type Image = {
  src?: string;
  alt?: string;
  padding?: string;
  backgroundColor?: string;
};

type BlockAttributes =
  | HeadingTextProps
  | ParagraphTextProps
  | ButtonProps
  | Image;

// separation of concerns - values need to be stored in different object to how the application uses those values

export const blockAttributes: { [index: string]: BlockAttributes } = {
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
    URLAddress: "#",
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
};

type BlockInfo = {
  inputType: string;
  label: string;
  options?: string[];
};

export const blockInfo: { [index: string]: BlockInfo } = {
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
  text: { inputType: "text", label: "Text" },
  alt: { inputType: "text", label: "Alt Text" },
  src: { inputType: "file", label: "Upload Image" },
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
