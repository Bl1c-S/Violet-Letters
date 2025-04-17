"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";

interface InputItemProps {
  title: string;
  type: string;
  startValue?: string;
}

export interface InputItemRef {
  getValue: () => string;
}

export const InputItem = forwardRef<InputItemRef, InputItemProps>(
  ({ title, type, startValue }, ref) => {
    const [value, setValue] = useState(startValue ?? "");

    useImperativeHandle(ref, () => ({
      getValue: () => value,
    }));

    return (
      <div className="mb-4">
        <label htmlFor={type} className="block text-gray-700">
          {title}
        </label>
        <input
          type={type}
          id={type}
          className="w-full px-3 py-2 border rounded text-gray-700"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
    );
  },
);
InputItem.displayName = "InputItem";

export const InputError: React.FC<{ error: string | null }> = ({ error }) => {
  return <>{error && <p className="text-red-500 mb-4">{error}</p>}</>;
};

export const GetRef = (ref: React.RefObject<InputItemRef>) => {
  if (ref.current) return ref.current.getValue();
};
