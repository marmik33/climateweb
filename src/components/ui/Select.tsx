import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    }

    const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    label,
    placeholder,
    className = '',
    disabled = false,
    }) => {
    return (
        <div className="w-full">
        {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            </label>
        )}
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
            w-full px-4 py-2.5 border border-gray-300 rounded-lg
            bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${className}
            `}
        >
            {placeholder && (
            <option value="" disabled>
                {placeholder}
            </option>
            )}
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </div>
    );
};

export default Select;