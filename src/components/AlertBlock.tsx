import { XCircleIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";

export default function ErrorBlock({
  type,
  heading,
  children,
}: PropsWithChildren<{
  type: "error" | "warning" | "success";
  heading: string;
}>) {
  const Icon =
    type === "error"
      ? XCircleIcon
      : type === "warning"
      ? ExclamationTriangleIcon
      : CheckCircleIcon;

  return (
    <div
      className={`rounded-md ${
        type === "error"
          ? "bg-red-50"
          : type === "warning"
          ? "bg-yellow-50"
          : "bg-green-50"
      } p-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={`h-5 w-5 ${
              type === "error"
                ? "text-red-400"
                : type === "warning"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3
            className={`text-sm font-medium ${
              type === "error"
                ? "text-red-800"
                : type === "warning"
                ? "text-yellow-800"
                : "text-green-800"
            }`}
          >
            {heading}
          </h3>
          <div
            className={`"mt-2 text-sm ${
              type === "error"
                ? "text-red-700"
                : type === "warning"
                ? "text-yellow-700"
                : "text-green-700"
            }"`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
