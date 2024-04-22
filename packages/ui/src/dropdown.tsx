import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  disabled?: boolean;
  placeholder?: string;
  multiSelect?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  placeholder,
  multiSelect,
  closeOnSelect,
  className,
  id,
  name,
  label,
  isRequired,
  error,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
  };

  return (
    <div className='flex flex-col gap-1'>
        <div>
        {label && <label htmlFor={id}>{label}</label>}
            </div>
            <div>
      <select
        id={id}
        name={name}
        className={`outline-none focus:outline-none p-2 bg-white w-[150px] dark:bg-black dark:shadow-none shadow-lg dark:border-slate-200 dark:text-white border-gray-500 border rounded-md ${className}`}
        // value={value}
        onChange={handleSelectChange}
        disabled={disabled}
        multiple={multiSelect}

      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default Dropdown;
