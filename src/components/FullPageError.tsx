import { type PropsWithChildren } from "react";

export default function FullPageError({
  heading,
  linkText,
  linkAddress,
  errorCode,
  children,
}: PropsWithChildren<{
  heading: string;
  linkText: string;
  linkAddress: string;
  errorCode?: number;
}>) {
  return (
    <>
      <main className="grid min-h-[100vh] place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          {errorCode && (
            <p className="text-base font-semibold text-blue-600">{errorCode}</p>
          )}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {heading}
          </h1>
          {children}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={linkAddress}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {linkText}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
