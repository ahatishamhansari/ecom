"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass = "ui-button";
    const classes = [
      baseClass,
      `${baseClass}--${variant}`,
      `${baseClass}--${size}`,
      fullWidth ? `${baseClass}--full-width` : "",
      isLoading ? `${baseClass}--loading` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="ui-button__spinner" aria-hidden="true"></span>
        )}
        <span className="ui-button__content">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
