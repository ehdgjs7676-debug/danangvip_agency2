import React, { useState } from "react";

interface TransProps {
  children: React.ReactNode;
  ko: string;
  className?: string;
}

export default function Trans({ children, ko, className = "" }: TransProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-help group/trans ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#0a0a0a] border border-[#D4AF37] text-[#D4AF37] text-[11px] font-sans font-medium tracking-normal normal-case whitespace-nowrap shadow-2xl z-[9999] pointer-events-none rounded-none block animate-fade-in">
          <span className="font-semibold block text-center text-white/95 text-[10px] leading-tight mb-0.5 border-b border-[#D4AF37]/20 pb-0.5">번역</span>
          <span className="block text-center text-xs text-[#D4AF37] font-sans font-medium">{ko}</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#D4AF37]" />
        </span>
      )}
    </span>
  );
}
