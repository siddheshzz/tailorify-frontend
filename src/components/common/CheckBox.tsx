import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className={`h-4 w-4 rounded border focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {label && (
          <span className="text-sm font-medium text-gray-700">
            {label}
          </span>
        )}
      </label>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
