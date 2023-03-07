import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import InputWithLabel from "~/components/InputWithLabel";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import AlertBlock from "~/components/AlertBlock";
import { toast } from "react-hot-toast";
import AuthLayout from "~/layouts/AuthLayout";
import Button from "~/components/Button";

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
      <AuthLayout heading="Sign in to your account" authType="sign-in">
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
          <div>
            <div className="grid grid-cols-1">
              <Button appearance="primary" size="md" type="submit">
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
