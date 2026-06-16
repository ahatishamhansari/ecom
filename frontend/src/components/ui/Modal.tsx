"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="ui-modal-overlay glass-effect" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="ui-modal-content animate-slide-up" ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export const ModalHeader = ({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) => (
  <div className="ui-modal-header">
    <div className="ui-modal-title">{children}</div>
    {onClose && (
      <button className="ui-modal-close" onClick={onClose} aria-label="Close modal">
        &times;
      </button>
    )}
  </div>
);

export const ModalBody = ({ children }: { children: React.ReactNode }) => (
  <div className="ui-modal-body">{children}</div>
);

export const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="ui-modal-footer">{children}</div>
);
