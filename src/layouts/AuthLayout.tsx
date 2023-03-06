import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Logo from "~/components/Logo";

export default function ({
  children,
  heading,
  authType,
}: PropsWithChildren<{ heading: string; authType?: "login" | "sign-up" }>) {
  return (
    <>
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
                href={`/auth/${authType === "login" ? "sign-up" : "log-in"}`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {authType === "login"
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
