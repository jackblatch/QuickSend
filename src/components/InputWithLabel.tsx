type Props = {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  state: any; // change to record
  setState: React.Dispatch<React.SetStateAction<any>>; // change to record
  [x: string]: any;
};

export default function InputWithLabel({
  label,
  id,
  type,
  placeholder,
  state,
  setState,
  ...delegated
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          value={state[id]}
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          {...delegated}
        />
      </div>
    </div>
  );
}
