"use client";

import React, { forwardRef, InputHTMLAttributes, useId } from "react";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = error
      ? errorId
      : helperText
      ? helperId
      : undefined;

    return (
      <div className={`ui-input-container ${className}`}>
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label}
            {props.required && <span className="ui-input-required">*</span>}
          </label>
        )}
        <div className="ui-input-wrapper">
          <input
            ref={ref}
            id={inputId}
            className={`ui-input ${error ? "ui-input--error" : ""}`}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="ui-input-message ui-input-message--error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="ui-input-message ui-input-message--helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
