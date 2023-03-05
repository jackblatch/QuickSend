export default function EditorTextArea({
  label,
  id,
  ...delegated
}: {
  label: string;
  id: string;
  [x: string]: any;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name={id}
          id={id}
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6"
          {...delegated}
        />
      </div>
    </div>
  );
}
