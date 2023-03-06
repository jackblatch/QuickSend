import { useState } from "react";
import InputWithLabel from "~/components/InputWithLabel";
import Logo from "~/components/Logo";
import ErrorBlock from "~/components/AlertBlock";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const createAccount = api.auth.createAccount.useMutation();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const Router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Logo justifyContent="justify-center" type="iconAndText" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/auth/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in with your account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <ErrorBlock type="error" heading="Oops! An error occured.">
                Please try again later.
              </ErrorBlock>
            )}
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.promise(
                  createAccount.mutateAsync(formValues),
                  {
                    loading: "Creating account...",
                    success: () => {
                      Router.push("/auth/sign-in?registered=true");
                      return "Account created!";
                    },
                    error: () => {
                      setError(true);
                      return "Error creating account.";
                    },
                  },
                  {
                    position: "bottom-center",
                  }
                );
              }}
            >
              <InputWithLabel
                id="firstName"
                label="First Name"
                type="text"
                state={formValues}
                setState={setFormValues}
                placeholder=""
                required
              />
              <InputWithLabel
                id="lastName"
                label="Last Name"
                type="text"
                state={formValues}
                setState={setFormValues}
                placeholder=""
                required
              />
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
                label="Password (Minimum 8 characters)"
                type="password"
                state={formValues}
                setState={setFormValues}
                placeholder=""
                autoComplete="new-password"
                required
                minLength={8}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
