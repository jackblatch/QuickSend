import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import InputWithLabel from "~/components/InputWithLabel";
import Logo from "~/components/Logo";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import AlertBlock from "~/components/AlertBlock";
import { toast, Toaster } from "react-hot-toast";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const Router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [registerRedirect, setRegisterRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (Router.isReady) {
      Router.query.error
        ? setError(true)
        : Router.query.registered === "true"
        ? setRegisterRedirect(true)
        : null;
    }
  }, [Router.isReady]);

  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Logo justifyContent="justify-center" type="iconAndText" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/auth/sign-up"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create an account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <AlertBlock type="error" heading="Oops! An error occured.">
                Please check your details and try again.
              </AlertBlock>
            )}
            {registerRedirect && (
              <AlertBlock type="success" heading="Account created!">
                Please sign in below.
              </AlertBlock>
            )}
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.promise(
                  signIn("credentials", {
                    ...formValues,
                    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard`,
                  }),
                  {
                    loading: "Logging in...",
                    success: "Logged in!",
                    error: "Error logging in.",
                  },
                  {
                    position: "bottom-center",
                  }
                );
              }}
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <InputWithLabel
                id="email"
                label="Email address"
                type="email"
                state={formValues}
                setState={setFormValues}
                placeholder=""
                required
                autoComplete="email"
              />
              <InputWithLabel
                id="password"
                label="Password"
                type="password"
                state={formValues}
                setState={setFormValues}
                placeholder=""
                autoComplete="current-password"
                required
              />
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
