import React, { useState } from "react";
import { MessageCircle, Send, ShieldCheck, Phone, Check, Copy } from "lucide-react";
import Trans from "./Trans";

interface CounselFormProps {
  onSubmitSuccess?: () => void;
}

export default function CounselForm({ onSubmitSuccess }: CounselFormProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    if (onSubmitSuccess) {
      // Keep support for legacy prop calls if needed
    }
    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/10 rounded-none p-6 md:p-12 shadow-2xl relative overflow-hidden" id="counsel-form-container">
      {/* Visual luxury ambient lights */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#D4AF37]/5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="space-y-10 relative z-10">
        {/* Header Block */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-none text-[10px] text-[#D4AF37] font-semibold tracking-[0.3em] uppercase">
            <Trans ko="VVIP 프라이빗 기밀 직신청 채널">VVIP PRIVATE DIRECT LINE</Trans>
          </div>
          <h3 className="font-serif italic font-light text-2xl md:text-3xl text-white tracking-widest uppercase">
            VVIP 1:1 극비 직통 소통 라인
          </h3>
          <p className="text-xs text-white/50 max-w-xl mx-auto leading-relaxed">
            회원님의 인적사항 보안과 한결 빠르고 직관적인 견적 조율을 위해 기존의 실시간 신청 양식을 폐지하고 
            <strong> 24시간 항시 가동되는 카카오톡 및 텔레그램 직배정 다이렉트 긴급 연락망</strong>을 개방하였습니다. 
            사생활 비밀유지 최우선 약속에 따라 상담이 끝난 대화 기록은 48시간 이내 전원 영구 자동 파찰 처리됩니다.
          </p>
        </div>

        {/* 1:1 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          
          {/* Kakao Card */}
          <div 
            onClick={() => handleCopy("danangvip_vip", "카카오톡")}
            className="group bg-[#060606] border border-white/5 hover:border-[#D4AF37]/40 p-6 rounded-none cursor-pointer hover:bg-[#D4AF37]/5 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <span className="text-[9px] text-[#FEE500] font-bold tracking-[0.25em] block uppercase">
                  <Trans ko="카카오톡 우수회원 전용선">KAKAOTALK VIP CHANNEL</Trans>
                </span>
                <h4 className="font-display font-bold text-sm text-white tracking-widest">
                  카카오톡 즉시추가
                </h4>
              </div>
              <div className="w-9 h-9 bg-[#FEE500]/10 border border-[#FEE500]/20 flex items-center justify-center text-[#FEE500] group-hover:border-[#FEE500]/40 transition-colors">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 border border-white/5 py-3 px-4 flex justify-between items-center">
                <span className="text-xs text-white/70 font-mono tracking-wider font-semibold">
                  danangvip_vip
                </span>
                {copiedId === "danangvip_vip" ? (
                  <span className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> 복사 완료
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                )}
              </div>
              
              <button className="w-full py-2.5 border border-[#FEE500]/20 hover:border-[#FEE500] bg-transparent text-[#FEE500]/80 group-hover:text-[#FEE500] text-[10px] font-extrabold rounded-none tracking-widest transition-all duration-300 uppercase">
                {copiedId === "danangvip_vip" ? "아이디 복사완료" : "아이디 복사 후 카톡 추가"}
              </button>
            </div>
          </div>

          {/* Telegram Card */}
          <div 
            onClick={() => handleCopy("@danang_private", "텔레그램")}
            className="group bg-[#060606] border border-white/5 hover:border-[#D4AF37]/40 p-6 rounded-none cursor-pointer hover:bg-[#D4AF37]/5 transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <span className="text-[9px] text-[#0088cc] font-bold tracking-[0.25em] block uppercase">
                  <Trans ko="텔레그램 다이렉트 소통 라인">TELEGRAM DIRECT CONCIERGE</Trans>
                </span>
                <h4 className="font-display font-bold text-sm text-white tracking-widest">
                  텔레그램 직배정 문의
                </h4>
              </div>
              <div className="w-9 h-9 bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-center justify-center text-[#0088cc] group-hover:border-[#0088cc]/40 transition-colors">
                <Send className="w-4 h-4 fill-current text-[#0088cc]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 border border-white/5 py-3 px-4 flex justify-between items-center">
                <span className="text-xs text-white/70 font-mono tracking-wider font-semibold">
                  @danang_private
                </span>
                {copiedId === "@danang_private" ? (
                  <span className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> 복사 완료
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                )}
              </div>

              <button className="w-full py-2.5 border border-[#0088cc]/20 hover:border-[#0088cc] bg-transparent text-[#0088cc]/80 group-hover:text-[#0088cc] text-[10px] font-extrabold rounded-none tracking-widest transition-all duration-300 uppercase">
                {copiedId === "@danang_private" ? "아이디 복사완료" : "아이디 복사 후 텔레 전송"}
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Visual Guarantee Badges */}
        <div className="max-w-2xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-[10px] text-white/40">
          <span className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            성명/전화번호 불요 100% 익명상담 보증
          </span>
          <span className="flex items-center gap-2 font-mono">
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            대표 집무실 24시간 실시간 무장 대기조
          </span>
        </div>
      </div>
    </div>
  );
}
