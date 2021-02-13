import * as React from 'react';

interface TextFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange(newValue: string): void;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  errorMessage,
  id,
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}) => {
  const [textValue, setTextValue] = React.useState(value ?? '');

  React.useEffect(() => {
    setTextValue(value);
  }, [value]);

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setTextValue(event.target.value);
    // TODO: Add option to debouncing?
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
        {label}
      </label>
      <div className="relative">
        {/* <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-5 w-5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      use pl-12 in input for this icon */}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={textValue}
          onChange={changeValue}
          className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-2"
        />
        {errorMessage !== undefined && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};
