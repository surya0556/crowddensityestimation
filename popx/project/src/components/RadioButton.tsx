import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center mr-4 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          className="hidden"
          checked={checked}
          onChange={() => onChange(value)}
        />
        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
          {checked && (
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          )}
        </div>
      </div>
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;