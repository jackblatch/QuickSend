export default function EditorInputField({
  label,
  id,
  type,
  ...delegated
}: {
  label: string;
  id: string;
  type: string;
  [x: string]: any;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-md block font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          className={`${
            type !== "color" &&
            "w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          } "block border-0 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
          {...delegated}
        />
      </div>
    </div>
  );
}
