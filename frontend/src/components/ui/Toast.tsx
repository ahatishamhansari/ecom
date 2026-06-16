import React, { useEffect, useState } from "react";
import "./Toast.css";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onRemove(toast.id), 300); // Wait for close animation
    }, 3000); // Auto dismiss after 3s

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success": return "✅";
      case "error": return "❌";
      case "info": return "ℹ️";
      default: return "";
    }
  };

  return (
    <div className={`ui-toast ui-toast--${toast.type} ${isClosing ? "ui-toast--closing" : "animate-slide-up"}`} role="alert">
      <span className="ui-toast-icon">{getIcon()}</span>
      <span className="ui-toast-message">{toast.message}</span>
      <button className="ui-toast-close" onClick={handleClose} aria-label="Close">
        &times;
      </button>
    </div>
  );
}
