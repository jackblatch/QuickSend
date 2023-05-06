import { useState } from "react";
import InputWithLabel from "~/components/InputWithLabel";
import ErrorBlock from "~/components/AlertBlock";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import AuthLayout from "~/layouts/AuthLayout";
import Button from "~/components/Button";

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
    <AuthLayout heading="Create an account" authType="sign-up">
      {error && (
        <ErrorBlock type="error" heading="Oops! An error occured.">
          Please try again later.
        </ErrorBlock>
      )}
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          void toast.promise(
            createAccount.mutateAsync(formValues),
            {
              loading: "Creating account...",
              success: () => {
                void Router.push("/auth/sign-in?registered=true");
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
          <div className="grid grid-cols-1">
            <Button appearance="primary" size="md" type="submit">
              Create account
            </Button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
