export default function AnnouncementBar({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <div className="flex items-center gap-x-6 bg-gray-900 py-2.5 px-6 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-white">
        <a href={link}>
          {text}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          {/* <span className="sr-only">Dismiss</span> */}
          {/* <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" /> */}
        </button>
      </div>
    </div>
  );
}
