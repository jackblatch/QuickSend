import Head from "next/head";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Logo from "~/components/Logo";

export default function ({
  children,
  heading,
  authType,
}: PropsWithChildren<{
  heading: string;
  authType: "sign-in" | "sign-up" | "sign-out";
}>) {
  return (
    <>
      <Head>
        <title>{`${
          authType === "sign-in"
            ? "Sign in"
            : authType === "sign-up"
            ? "Create an account"
            : authType === "sign-out"
            ? "Sign Out"
            : "Authentication"
        } - QuickSend`}</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Logo justifyContent="justify-center" type="iconAndText" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {heading}
          </h2>
          {authType && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href={`/auth/${authType === "sign-in" ? "sign-up" : "sign-in"}`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {authType === "sign-in"
                  ? "create an account"
                  : "Sign in with your account"}
              </a>
            </p>
          )}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
