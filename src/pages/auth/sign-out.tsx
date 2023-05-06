import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "~/components/Button";
import AuthLayout from "~/layouts/AuthLayout";
import getServerSideProps from "~/utils/handleSessionRedirect";

export { getServerSideProps };

export default function SignOut() {
  const router = useRouter();

  return (
    <AuthLayout heading="Sign out" authType="sign-out">
      <h3 className="mb-8 text-center text-xl text-gray-800">
        Are you sure you want to sign out?
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="submit"
          size="md"
          appearance="secondary"
          onClick={() => router.back()}
        >
          <p className="col-span-1">Cancel</p>
        </Button>
        <Button
          type="submit"
          size="md"
          appearance="primary"
          onClick={(e) => {
            e.preventDefault();
            void toast.promise(
              signOut({ callbackUrl: "/" }),
              {
                loading: "Signing out...",
                success: () => {
                  return "Signed out!";
                },
                error: () => {
                  return "Error signing out.";
                },
              },
              {
                position: "bottom-center",
              }
            );
          }}
        >
          <p className="col-span-1">Yes</p>
        </Button>
      </div>
    </AuthLayout>
  );
}
