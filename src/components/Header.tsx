/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Crown, MessageCircle, Send, Settings, Menu, X } from "lucide-react";
import Trans from "./Trans";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export default function Header({
  activeSection,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "hero", label: "HOME", ko: "홈" },
    { id: "benefits", label: "CASINO VIP", ko: "카지노 VIP 우대" },
    { id: "golfvillas", label: "GOLF & VILLA", ko: "골프 & 독채풀빌라" },
    { id: "nightlife", label: "NIGHTLIFE", ko: "밤문화 엔터테인먼트" },
    { id: "portfolio", label: "EXPERIENCE", ko: "실제 고객 여정기" },
    { id: "blogs", label: "SEO INSIGHTS", ko: "다낭 알짜 정보 칼럼" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#050505]/95 border-b border-white/10 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div
          onClick={() => handleItemClick("hero")}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-8 h-8 border-2 border-gold-400 rotate-45 flex items-center justify-center transition-transform group-hover:rotate-135 duration-700">
            <span className="text-[9px] -rotate-45 font-extrabold text-gold-400">VIP</span>
          </div>
          <div className="flex flex-col">
            <Trans ko="다낭 프라이빗" className="font-display text-lg md:text-xl font-light tracking-[0.3em] text-white">
              DANANG PRIVATE
            </Trans>
            <Trans ko="우수 귀빈 멤버십" className="text-[9px] text-[#D4AF37] tracking-[0.4em] font-medium -mt-1 leading-none uppercase">
              VIP MEMBERSHIP
            </Trans>
          </div>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-xs tracking-[0.2em] font-medium transition-all hover:text-gold-300 relative py-2 cursor-pointer ${
                activeSection === item.id ||
                (item.id === "hero" && activeSection === "")
                  ? "text-gold-450 text-gold-400 font-bold"
                  : "text-gray-400"
              }`}
            >
              <Trans ko={item.ko}>
                {item.label}
              </Trans>
              {(activeSection === item.id ||
                (item.id === "hero" && activeSection === "")) && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gold-400 animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* Quick Contact & Admin Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Indicator/Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isAdminLoggedIn
                ? "border-gold-500 bg-gold-950/40 text-gold-400"
                : "border-gray-800 hover:border-gold-600/50 text-gray-400 hover:text-white"
            }`}
            title="관리자 제어반"
            id="admin-btn-header"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Luxury CTA */}
          <button
            onClick={() => handleItemClick("counsel")}
            className="flex items-center gap-1.5 px-4 py-2 text-[11px] tracking-wider rounded border border-gold-400/40 bg-gradient-to-r from-gold-900/40 to-yellow-950/40 hover:from-gold-800/60 hover:to-yellow-900/60 text-gold-200 hover:text-white hover:border-gold-300 transition-all font-medium cursor-pointer"
          >
            <Send className="w-3 h-3 text-gold-400" />
            1:1 상담요청
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded border transition-all ${
              isAdminLoggedIn
                ? "border-gold-500 bg-gold-950/30 text-gold-400"
                : "border-gray-800 text-gray-400"
            }`}
            id="admin-btn-mobile"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-gray-800 text-gray-300 hover:text-white hover:bg-luxury-gray rounded"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-luxury-dark border-b border-gold-800/30 px-5 py-6 absolute top-full left-0 w-full flex flex-col gap-4 animate-slide-down shadow-xl">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-left text-xs tracking-widest font-semibold py-2.5 border-b border-gray-900 ${
                activeSection === item.id
                  ? "text-gold-400 pl-2"
                  : "text-gray-400"
              }`}
            >
              <Trans ko={item.ko}>
                {item.label}
              </Trans>
            </button>
          ))}
          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => handleItemClick("counsel")}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-600 to-amber-700 hover:from-gold-500 hover:to-amber-600 text-white rounded text-xs font-bold tracking-widest"
            >
              <Send className="w-4 h-4" /> 1:1 일정상담
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
