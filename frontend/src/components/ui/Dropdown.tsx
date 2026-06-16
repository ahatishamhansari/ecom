"use client";

import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

// Custom hook for clicking outside
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ trigger, children, align = "left" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="ui-dropdown" ref={dropdownRef}>
      <div className="ui-dropdown-trigger" onClick={toggle} role="button" aria-expanded={isOpen}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`ui-dropdown-menu ui-dropdown-menu--${align} animate-fade-in`}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              // Automatically close dropdown when an item is clicked
              return React.cloneElement(child as React.ReactElement<any>, {
                onClick: (e: any) => {
                  if (child.props.onClick) child.props.onClick(e);
                  setIsOpen(false);
                }
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

export const DropdownItem = ({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: React.ReactNode; 
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) => (
  <div className={`ui-dropdown-item ${className}`} onClick={onClick} role="menuitem">
    {children}
  </div>
);
