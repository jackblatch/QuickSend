import { PropsWithChildren } from "react";

export default function Button({
  size,
  type,
  children,
}: PropsWithChildren<{
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  type: "primary" | "secondary";
}>) {
  if (size === "sm") {
    return (
      <button
        type="button"
        className={`${
          type === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : type === "secondary"
            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            : null
        } inline-flex items-center rounded border border-transparent  px-2.5 py-1.5 text-xs font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  } else if (size === "md") {
    return (
      <button
        type="button"
        className={`${
          type === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : type === "secondary"
            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            : null
        } inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  } else if (size === "lg") {
    return (
      <button
        type="button"
        className={`${
          type === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : type === "secondary"
            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            : null
        } inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  } else if (size === "xl") {
    return (
      <button
        type="button"
        className={`${
          type === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : type === "secondary"
            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            : null
        } shadow-s inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={`${
          type === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : type === "secondary"
            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            : null
        } inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {children}
      </button>
    );
  }
}
