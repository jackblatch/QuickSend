import Head from "next/head";
import Link from "next/link";
import Button from "~/components/Button";
import Logo from "~/components/Logo";

export default function Home() {
  return (
    <>
      <Head>
        <title>QuickSend - Visual Email Builder</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative isolate flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 pt-10 pb-24 sm:pb-32 md:flex-row lg:flex lg:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <Logo justifyContent="justify-start" type="iconAndText" size="lg" />
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Visual drag and drop email builder{" "}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Design, develop, and send emails fast, with confidence.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button appearance="primary" size="md">
                {/* Use a tag for registration unavailable redirection */}
                <a href="/auth/sign-up">Sign up</a>
              </Button>
              <Link href="/auth/sign-in">
                <Button appearance="secondary" size="md">
                  Login
                </Button>
              </Link>
            </div>
            <a href="/admin/campaign/edit/example-builder">
              <p className="mt-6 w-fit rounded-full bg-green-200 px-5 py-1 text-sm font-medium text-green-900 hover:text-green-700">
                Or try the builder without an account{" "}
                <span aria-hidden="true">→</span>
              </p>
            </a>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="/campaign-editor.png"
                  alt="QuickSend editor"
                  className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
