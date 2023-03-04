import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Logo({
  type,
  justifyContent,
  colorTheme,
}: {
  justifyContent: string;
  type?: "iconAndText";
  colorTheme?: "light" | "dark";
}) {
  return (
    <Link href="/">
      <div className={`${justifyContent} align-center flex`}>
        {type === "iconAndText" && (
          <h3
            className={`${
              colorTheme === "light" ? "text-white" : "text-gray-900"
            } tracking-loose mb-0 pb-0 text-2xl font-bold`}
          >
            QuickSend
          </h3>
        )}
        <PaperAirplaneIcon
          width="30px"
          className={`${
            colorTheme === "light" ? "text-white" : "text-blue-600"
          } ml-2`}
        />
      </div>
    </Link>
  );
}
