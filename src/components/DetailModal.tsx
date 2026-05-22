/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Send, MapPin, Check, Star } from "lucide-react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  tags?: string[];
  description: string;
  bullets?: string[];
  locationDetails?: string;
  ctaText?: string;
  onCtaClick: () => void;
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  imageUrl,
  tags,
  description,
  bullets = [],
  locationDetails,
  ctaText = "VIP 비밀 라인 실시간 문의하기",
  onCtaClick
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#0c0c0c] border border-white/10 rounded-none w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in"
        id="detail-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black p-2 rounded-none border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Hero Image */}
        {imageUrl && (
          <div className="h-60 w-full relative border-b border-white/10">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />
            <div className="absolute bottom-4 left-6">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#D4AF37] text-black font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-none font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-widest uppercase mb-1">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal content area */}
        <div className="p-6 md:p-8 space-y-6">
          {!imageUrl && (
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-[11px] text-[#D4AF37] font-bold tracking-widest uppercase border-b border-white/10 pb-1.5">
              상세 개요 및 서비스 범위
            </h4>
            <p className="text-sm text-white/50 leading-relaxed font-sans whitespace-pre-wrap">
              {description}
            </p>
          </div>

          {/* Location details */}
          {locationDetails && (
            <div className="bg-[#050505] border border-white/5 rounded-none p-4 flex gap-3 text-xs items-center">
              <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">VVIP 매칭 동선 위치</strong>
                <span className="text-white/40 font-mono">{locationDetails}</span>
              </div>
            </div>
          )}

          {/* Highlights Bullets */}
          {bullets.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[11px] text-[#D4AF37] font-bold tracking-widest uppercase border-b border-white/10 pb-1.5">
                프로그램 주요 하이라이트 포함 사항
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-white/50 items-start leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] stroke-[3px] mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Active CTA Trigger */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onCtaClick();
              }}
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#bfa032] text-black font-extrabold text-xs tracking-widest rounded-none transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] uppercase"
            >
              <Send className="w-3.5 h-3.5 fill-current text-black stroke-[2.5]" />
              {ctaText}
            </button>
            <p className="text-[10px] text-center text-white/40 mt-3 font-sans">
              ※ 이 프로그램은 고객 성향과 바이인 수준에 맞추어 세심하게 리프로그래밍 변경이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
