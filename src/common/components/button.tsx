import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
