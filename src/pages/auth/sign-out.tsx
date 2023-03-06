import Logo from "~/components/Logo";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignOut() {
  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Logo justifyContent="justify-center" type="iconAndText" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign out
          </h2>
          <h3 className="mt-4 text-center text-xl text-gray-800">
            Are you sure you want to sign out?
          </h3>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="justufy-center align-items flex flex-row-reverse gap-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                  toast.promise(
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
                Yes
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
