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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full bg-black/20 border border-white/10 rounded-lg
          px-3 py-2 text-sm text-gray-200 flex items-center justify-between
          hover:bg-black/30 transition-all duration-200
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
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-3 py-2 text-sm rounded-md text-gray-100 cursor-pointer
                hover:bg-neutral-700 transition-all duration-200
              "
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
