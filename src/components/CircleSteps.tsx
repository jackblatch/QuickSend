import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import formatClasses from "~/utils/formatClasses";

export default function CircleSteps({
  steps,
}: {
  steps: {
    name: string;
    href: string;
    status: "complete" | "current" | "upcoming";
  }[];
}) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={formatClasses(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <Link
                  href={step.href}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900"
                >
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <Link
                  href={step.href}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <Link
                  href={step.href}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-1 flex items-center justify-between text-xs uppercase">
        {steps.map((step, i) => (
          <p
            key={i}
            className={`${
              i === 0
                ? "ml-[-8px]"
                : i === steps.length - 1
                ? "mr-[-5px]"
                : null
            } text-white`}
          >
            {step.name}
          </p>
        ))}
      </div>
    </nav>
  );
}
