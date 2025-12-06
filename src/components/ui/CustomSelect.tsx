"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    name: string;
    value: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export default function CustomSelect({
    name,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    required = false,
    className = "",
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white cursor-pointer flex items-center justify-between ${className}`}
            >
                <span className={value ? "text-neutral-900" : "text-neutral-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                    {options.map((option) => {
                        const isSelected = value === option.value;
                        return (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors ${isSelected
                                    ? "bg-orange-100 text-orange-900 font-medium"
                                    : "hover:bg-orange-50 text-neutral-700"
                                    }`}
                            >
                                <span>{option.label}</span>
                                {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Hidden input for form submission */}
            <input
                type="hidden"
                name={name}
                value={value}
                required={required}
            />
        </div>
    );
}
