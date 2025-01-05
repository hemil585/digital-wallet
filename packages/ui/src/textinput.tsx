"use client";

export const TextInput = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label?: string;
}) => {
  return (
    <div className="pt-2 my-5">
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};
