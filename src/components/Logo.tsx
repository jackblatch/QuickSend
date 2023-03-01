import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Logo({
  type,
  justifyContent,
}: {
  justifyContent: string;
  type?: "iconAndText";
}) {
  return (
    <Link href="/">
      <div className={`${justifyContent} align-center flex`}>
        {type === "iconAndText" && (
          <h3 className="tracking-loose mb-0 pb-0 text-2xl font-bold text-gray-900">
            QuickSend
          </h3>
        )}
        <PaperAirplaneIcon width="30px" className="ml-2 text-blue-600" />
      </div>
    </Link>
  );
}
