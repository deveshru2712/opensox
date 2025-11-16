"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CustomDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      const currentIndex = optionsRef.current.findIndex(
        (el) => el === document.activeElement
      );

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % options.length;
          optionsRef.current[nextIndex]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex =
            currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
          optionsRef.current[prevIndex]?.focus();
          break;
        }
        case "Escape":
          setOpen(false);
          buttonRef.current?.focus();
          break;
        case "Home":
          e.preventDefault();
          optionsRef.current[0]?.focus();
          break;
        case "End":
          e.preventDefault();
          optionsRef.current[options.length - 1]?.focus();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, options.length]);

  // Focus first option when dropdown opens
  useEffect(() => {
    if (open) {
      optionsRef.current[0]?.focus();
    }
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="
          w-full bg-black/20 border border-white/10 rounded-lg
          px-3 py-2 text-sm text-gray-200 flex items-center justify-between
          hover:bg-black/30 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
        "
      >
        {selected?.label}
        {open ? (
          <ChevronUp size={16} className="text-gray-300 pl-2" />
        ) : (
          <ChevronDown size={16} className="text-gray-300 pl-2" />
        )}
      </button>

      {open && (
        <div        
          className="
            absolute mt-2 w-full
            bg-neutral-900 text-white
            border border-white/10 
            rounded-md shadow-lg shadow-black/40
            z-[9999]
          "
        >
          {options.map((opt, index) => (
            <button
              type="button"
              key={opt.value}
              ref={(el) => { optionsRef.current[index] = el; }}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="
                w-full text-left px-3 py-2 text-sm rounded-md text-gray-100 cursor-pointer
                hover:bg-neutral-700 transition-all duration-200
                focus:outline-none focus:bg-neutral-700
                aria-selected:bg-neutral-800
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}