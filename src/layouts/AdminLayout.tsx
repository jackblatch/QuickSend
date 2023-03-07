import { Fragment, PropsWithChildren, use, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartBarIcon,
  DocumentTextIcon,
  HomeIcon,
  PaperAirplaneIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "~/components/Logo";
import formatClasses from "~/utils/formatClasses";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Breadcrumbs from "~/components/Breadcrumbs";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { format } from "path";

const initialNavigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Campaigns",
    href: "/admin/campaigns",
    icon: PaperAirplaneIcon,
    current: false,
  },
  {
    name: "Templates",
    href: "/admin/templates",
    icon: DocumentTextIcon,
    current: false,
  },
  { name: "Lists", href: "/admin/lists", icon: UsersIcon, current: false },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: ChartBarIcon,
    current: false,
  },
];

export default function AdminLayout({
  children,
  pageHeading,
  pages,
}: PropsWithChildren<{
  pageHeading: string;
  pages?: { name: string; href: string; current?: boolean | undefined }[];
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    const res = navigation.map((item) => {
      if (item.href === router.pathname) {
        return { ...item, current: true };
      }
      return { ...item, current: false };
    });
    setNavigation(res);
  }, [router]);

  return (
    <>
      <Head>
        <title>{`Edit ${pageHeading ?? "Dashboard"} - QuickSend`}</title>
        <meta name="description" content="Visual email builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Toaster />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Logo
                        justifyContent="justify-start"
                        colorTheme="light"
                        type="iconAndText"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={formatClasses(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                          )}
                        >
                          <item.icon
                            className={formatClasses(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 h-6 w-6 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <Link
                      href="/auth/sign-out"
                      className="group block flex-shrink-0"
                    >
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-1 text-sm font-medium text-gray-700">
                          {`${session?.user?.firstName[0]}${session?.user?.lastName[0]}`}
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            {`${session?.user?.firstName} ${session?.user?.lastName}`}
                          </p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                            Sign out
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Logo
                  justifyContent="justify-start"
                  colorTheme="light"
                  type="iconAndText"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={formatClasses(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={formatClasses(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <Link
                href="/auth/sign-out"
                className="group block w-full flex-shrink-0"
              >
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-1 text-sm font-medium text-gray-700">
                    {`${session?.user?.firstName[0]}${session?.user?.lastName[0]}`}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {`${session?.user?.firstName} ${session?.user?.lastName}`}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">
                      Sign out
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {pages && <Breadcrumbs pages={pages} />}
                <h1 className="text-2xl font-semibold text-gray-900">
                  {pageHeading}
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
