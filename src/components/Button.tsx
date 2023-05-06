import { type MouseEventHandler, type PropsWithChildren } from "react";

export default function Button({
  size,
  appearance,
  type = "button",
  onClick,
  children,
  ...delegated
}: PropsWithChildren<{
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  appearance: "primary" | "secondary" | "success";
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
}>) {
  if (size === "sm") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${
          appearance === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : appearance === "secondary"
            ? "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
            : ""
        }  rounded-md py-1.5 px-2.5 text-xs font-medium  shadow-sm ring-1 ring-inset  disabled:cursor-not-allowed disabled:opacity-75`}
        {...delegated}
      >
        {children}
      </button>
    );
  } else if (size === "md") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${
          appearance === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : appearance === "secondary"
            ? "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
            : appearance === "success"
            ? "bg-green-600 text-white ring-green-600"
            : ""
        }  rounded-md py-2 px-3 text-sm font-semibold  shadow-sm ring-1 ring-inset  disabled:cursor-not-allowed disabled:opacity-75`}
        {...delegated}
      >
        {children}
      </button>
    );
  } else if (size === "lg") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${
          appearance === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : appearance === "secondary"
            ? "border-gray-400 bg-gray-50 text-gray-700 hover:bg-gray-100"
            : ""
        } inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-75`}
        {...delegated}
      >
        {children}
      </button>
    );
  } else if (size === "xl") {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${
          appearance === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : appearance === "secondary"
            ? "border-gray-400 bg-gray-50 text-gray-700 hover:bg-gray-100"
            : ""
        } shadow-s inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-75`}
        {...delegated}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${
          appearance === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : appearance === "secondary"
            ? "border-gray-400 bg-gray-50 text-gray-700 hover:bg-gray-100"
            : ""
        } inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-75`}
        {...delegated}
      >
        {children}
      </button>
    );
  }
}
