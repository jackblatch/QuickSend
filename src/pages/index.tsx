import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "~/components/Logo";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const Router = useRouter();

  // useEffect(() => {
  //   if (sessionData?.user.id) {
  //     Router.push("/admin/dashboard");
  //   }
  // }, [sessionData]);

  return (
    <>
      <Head>
        <title>QuickSend - Visual Email Builder</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-10 pb-24 text-center sm:pb-32 lg:flex lg:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <Logo justifyContent="justify-center" type="iconAndText" />

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Visual drag and drop email builder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Send emails fast, with confidence.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/sign-up"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign up
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
