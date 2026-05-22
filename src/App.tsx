/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plane, 
  Car, 
  Hotel, 
  Home, 
  Coins, 
  UserCheck, 
  Ticket, 
  Calendar, 
  Shield, 
  Award, 
  Sparkles, 
  MessageCircle, 
  Send, 
  Star, 
  HelpCircle, 
  Lock, 
  ArrowRight, 
  Share2, 
  Clipboard, 
  Heart,
  Smartphone,
  ChevronRight,
  Sparkle,
  Compass,
  CheckCircle2
} from "lucide-react";

import { CasinoBenefit, GolfVillaPlace, NightExperience, PortfolioExperience, BlogArticle } from "./types";
import { INITIAL_BENEFITS, INITIAL_GOLF_VILLAS, INITIAL_NIGHT_EXPERIENCES, INITIAL_PORTFOLIOS, INITIAL_BLOGS } from "./data";

// Custom Components
import Header from "./components/Header";
import CounselForm from "./components/CounselForm";
import AdminPanel from "./components/AdminPanel";
import DetailModal from "./components/DetailModal";
import BlogSection from "./components/BlogSection";
import Trans from "./components/Trans";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Core managed state syncs with local storage
  const [portfolios, setPortfolios] = useState<PortfolioExperience[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [benefits, setBenefits] = useState<CasinoBenefit[]>([]);

  // Selected place/benefit for modal popup views
  const [selectedDetail, setSelectedDetail] = useState<{
    title: string;
    subtitle?: string;
    imageUrl?: string;
    tags?: string[];
    description: string;
    bullets?: string[];
    locationDetails?: string;
  } | null>(null);

  // Active Hero Slide Index
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  // Notification Copy Alert
  const [copyAlert, setCopyAlert] = useState<string | null>(null);

  const heroSlides = [
    {
      img: "https://images.openai.com/static-rsc-4/KwLL_NTtXLUH7294hl_c9wgWP0BKKO4_hq7OC0vm3_GeQ60iFBdcKgCL2kfdvlskrz8Hya9Z70skOuyDketB3U0PJRBWrTcSvaeRVpJ9DKTlBpR7C-w45Ga-UNfB-laP62nYuiCqMs6tkn8h1-pd-RFu47s9vGtRUyuBTEtEV6_MHfchDO3fsHmAfBvX4dpf?purpose=fullsize",
      title: "DANANG PRIVATE VIP EXPERIENCE",
      subtitle: "다낭에서 가장 프라이빗하고 은밀한 VIP 카지노 럭셔리 라이프",
      desc: "공항 패스트트랙 통과부터 호이아나 최고급 콤프 스위트룸 숙박, 명문 해상 챔피언십 골프, 프라이빗 밤문화 가이드까지 단 한 번의 밀행 상담으로 올인원 원스톱 전담 보좌합니다."
    },
    {
      img: "https://images.openai.com/static-rsc-4/EinSOgbg0UfGLuucxMbBHX_3h-mF_lz-dEdbkZmpph28biGxek4NtcNGDhAkp03z0RWuy2-GTFCS0PW8kGW-Gf7Puh-MJXjCIG-W45MoLFk3_CKt3XCjFAq1U8kJX3W9EiSsEPI-FP40Ryrl2SufKit4asUe78BcvYNbpVJ41cBCZXe-Jrl028GWRNl9ylAv?purpose=fullsize",
      title: "CASINO · GOLF · NIGHT · VILLA",
      subtitle: "돈 좀 아는 성공한 남성들이 선택한 단 하나의 멤버십 에이전시",
      desc: "철저히 보안이 엄장된 독채 풀빌라와 프라이빗 위스키 시가클럽, 24시간 동행 수행 비서 에스코트 서포트 시스템을 장착하여 사생활 보장을 생명처럼 수호합니다."
    },
    {
      img: "https://images.openai.com/static-rsc-4/GSdEqajGvtXCBF8904xASh8b_pZqctTx1AzbygVrfl970KEyyqqHsuWVl51KQffmnyqbMCAqvL_BV9x2tARQT6KeYa_70ys8MFCD-lcet5kaBtZXI7cgoZTwJlr04Rm_mIWFHD1AlBZv2gonDRQYG-KOoxFTC2BlRmKn4RBFeMuOkmFjyfdoCl5KY2V1r3l9?purpose=fullsize",
      title: "EXCLUSIVE PRIVATE MEMBERSHIP",
      subtitle: "대기 시간 0분의 공항 VIP 패스트트랙과 최상급 리무진 의전",
      desc: "다낭에 랜딩하는 첫 승객 관문부터 최고급 마이바흐 및 스프린터 리무진이 항시 동선을 호위하며, 비공개 프라이빗 바이인 규모 충족 시 항공과 숙박 일체를 무료 컴프 우대 지원합니다."
    }
  ];

  // Load and hydrate database state
  useEffect(() => {
    // 1. Portfolios
    const savedPorts = localStorage.getItem("danang_vip_portfolios");
    if (savedPorts) {
      try {
        setPortfolios(JSON.parse(savedPorts));
      } catch (e) {
        setPortfolios(INITIAL_PORTFOLIOS);
      }
    } else {
      localStorage.setItem("danang_vip_portfolios", JSON.stringify(INITIAL_PORTFOLIOS));
      setPortfolios(INITIAL_PORTFOLIOS);
    }

    // 2. Blogs
    const savedBlogs = localStorage.getItem("danang_vip_blogs");
    if (savedBlogs) {
      try {
        setBlogs(JSON.parse(savedBlogs));
      } catch (e) {
        setBlogs(INITIAL_BLOGS);
      }
    } else {
      localStorage.setItem("danang_vip_blogs", JSON.stringify(INITIAL_BLOGS));
      setBlogs(INITIAL_BLOGS);
    }

    // 3. Benefits
    const savedBenefits = localStorage.getItem("danang_vip_benefits");
    if (savedBenefits) {
      try {
        setBenefits(JSON.parse(savedBenefits));
      } catch (e) {
        setBenefits(INITIAL_BENEFITS);
      }
    } else {
      localStorage.setItem("danang_vip_benefits", JSON.stringify(INITIAL_BENEFITS));
      setBenefits(INITIAL_BENEFITS);
    }
  }, []);

  // Automatic hero slides carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-scroll configuration on active section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeSection]);

  // Handle active navigation and page state triggers
  const handleScrollToSection = (sectionId: string) => {
    const mainSections = ["hero", "benefits", "golfvillas", "nightlife", "portfolio", "blogs"];
    if (mainSections.includes(sectionId)) {
      setActiveSection(sectionId);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else if (sectionId === "counsel") {
      // Small timeout to allow element rendering/presence if needed, then scroll to form on current page
      setTimeout(() => {
        const element = document.getElementById("counsel");
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  // Helper mapping icon string to Lucide component
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Plane": return <Plane className="w-5 h-5 text-gold-400" />;
      case "Car": return <Car className="w-5 h-5 text-gold-400" />;
      case "Hotel": return <Hotel className="w-5 h-5 text-gold-400" />;
      case "Home": return <Home className="w-5 h-5 text-gold-400" />;
      case "Coins": return <Coins className="w-5 h-5 text-gold-400" />;
      case "UserCheck": return <UserCheck className="w-5 h-5 text-gold-400" />;
      case "Ticket": return <Ticket className="w-5 h-5 text-gold-400" />;
      case "Calendar": return <Calendar className="w-5 h-5 text-gold-400" />;
      default: return <Sparkles className="w-5 h-5 text-gold-400" />;
    }
  };

  // Click handler for copy-to-clipboard messaging targets
  const handleCopyTarget = (text: string, titleStr: string) => {
    navigator.clipboard.writeText(text);
    setCopyAlert(`${titleStr} 아이디가 복사되었습니다. 메신저에서 등록해 주십시오.`);
    setTimeout(() => {
      setCopyAlert(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen text-gray-200 bg-luxury-black font-sans relative">
      
      {/* 1. ELEGANTE FLOATING NAVIGATION HEADER */}
      <Header
        activeSection={activeSection}
        onNavigate={handleScrollToSection}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Floating Copy Alert Toast Notify */}
      {copyAlert && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gold-950 border border-gold-400 text-gold-100 text-xs px-6 py-3.5 rounded shadow-2xl tracking-wide flex items-center gap-3 animate-fade-in animate-bounce">
          <Sparkle className="w-4 h-4 text-gold-400 animate-spin" />
          <span className="font-semibold">{copyAlert}</span>
        </div>
      )}

      {/* Floating Messenger Contacts: Sticky Bottom Bar on Mobile, Elegant Float on Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 border-t border-white/10 backdrop-blur-md px-4 py-3 flex md:hidden items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={() => handleCopyTarget("danangvvip", "카카오톡")}
          className="flex-1 flex items-center justify-center gap-2 bg-[#FEE500] text-black font-extrabold text-[11px] py-3.5 tracking-wider rounded-none transition-all active:scale-[0.98] cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>카톡 ID 복사추가</span>
        </button>
        <button
          onClick={() => handleCopyTarget("@danangvvip", "텔레그램")}
          className="flex-1 flex items-center justify-center gap-2 bg-[#0088cc] text-white font-extrabold text-[11px] py-3.5 tracking-wider rounded-none transition-all active:scale-[0.98] cursor-pointer"
        >
          <Send className="w-4 h-4 fill-current" />
          <span>텔레그램 복사문의</span>
        </button>
      </div>

      {/* Floating Side Quick Messenger Dock for Desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-2.5">
        <button
          onClick={() => handleCopyTarget("danangvvip", "카카오톡")}
          className="group flex items-center justify-end gap-2.5 cursor-pointer bg-[#FEE500] hover:bg-[#ebd200] text-black font-extrabold text-xs px-4 py-3 rounded-none shadow-2xl transition-all duration-300 translate-y-0 hover:-translate-y-1"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap tracking-wider text-[11px] pr-1">
            카카오톡 ID: danangvvip 복사
          </span>
          <MessageCircle className="w-5 h-5 fill-current" />
        </button>

        <button
          onClick={() => handleCopyTarget("@danangvvip", "텔레그램")}
          className="group flex items-center justify-end gap-2.5 cursor-pointer bg-[#0088cc] hover:bg-[#0074ad] text-white font-extrabold text-xs px-4 py-3 rounded-none shadow-2xl transition-all duration-300 translate-y-0 hover:-translate-y-1"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap tracking-wider text-[11px] pr-1">
            텔레그램: @danangvvip 복사
          </span>
          <Send className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* MAIN CONTENT AREA WITH MOTION PAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        {activeSection === "hero" && (
          <motion.div
            key="page-home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full animate-fade-in"
          >
            {/* 2. DYNAMIC MEDIA CAROUSEL HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Full Slider Overlay Images */}
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 z-0 transition-opacity duration-1500 ease-in-out ${
                    heroSlideIdx === idx ? "opacity-45 scale-100" : "opacity-0 scale-105"
                  } transform`}
                >
                  <img
                    src={slide.img}
                    alt="Hero luxury scene"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Elegant Radial Dark Gradients for Content Legibility */}
                  <div className="absolute inset-0 bg-radial-gradient bg-gradient-to-tr from-luxury-black via-luxury-black/75 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-transparent to-luxury-black" />
                </div>
              ))}

              {/* Content Container */}
              <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-10 pt-24">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-none text-[11px] text-[#D4AF37] font-semibold tracking-[0.4em] uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <Trans ko="프리미엄 정회원 전용">PREMIUM MEMBERSHIP ONLY</Trans>
                </div>

                <h2 className="font-serif italic font-light text-4xl md:text-7xl leading-none tracking-tight text-white select-none">
                  <Trans 
                    ko={
                      heroSlideIdx === 0 
                        ? "다낭 프라이빗 VIP 특별 여정" 
                        : heroSlideIdx === 1 
                          ? "카지노 · 골프 · 밤문화 · 독채 풀빌라" 
                          : "우수 독점 프라이빗 패스 회원 서비스"
                    }
                  >
                    {heroSlides[heroSlideIdx].title.includes("VIP") ? (
                      <>
                        {heroSlides[heroSlideIdx].title.split("VIP")[0]}
                        <span className="not-italic font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-[#D4AF37] tracking-tight block md:inline md:pl-2">
                          VIP {heroSlides[heroSlideIdx].title.split("VIP")[1]}
                        </span>
                      </>
                    ) : (
                      heroSlides[heroSlideIdx].title
                    )}
                  </Trans>
                </h2>

                <div className="h-[1px] w-28 bg-[#D4AF37]/30 mx-auto" />

                <p className="font-sans font-light text-lg md:text-2xl text-gold-100 tracking-widest uppercase">
                  {heroSlides[heroSlideIdx].subtitle}
                </p>

                <p className="font-sans font-light text-xs md:text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
                  {heroSlides[heroSlideIdx].desc}
                </p>

                {/* Action Call to buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
                  <button
                    onClick={() => handleScrollToSection("counsel")}
                    className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] hover:bg-[#bda030] text-black font-extrabold text-[12px] tracking-[0.2em] rounded-none shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black stroke-[3]" />
                    VIP 일정 비공개 직통문의
                  </button>

                  <button
                    onClick={() => handleScrollToSection("benefits")}
                    className="w-full sm:w-auto px-10 py-4 border border-white/20 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/5 text-white hover:text-white font-extrabold text-[12px] tracking-[0.2em] rounded-none transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-gold-300" />
                    밀착 케어 혜택 상세분석
                  </button>
                </div>

                {/* Quick Copy Contact Deck for Easy Conversion */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-3xl mx-auto pt-10 border-t border-white/10">
                  {[
                    { id: "kakao", label: "카카오톡 즉시추가", val: "danangvvip", icon: MessageCircle, border: "hover:border-[#FEE500]/40" },
                    { id: "tele", label: "텔레그램 직배정", val: "@danangvvip", icon: Send, border: "hover:border-[#0088cc]/40" },
                    { id: "hotline", label: "비상 긴급전화", val: "840392896025", icon: Smartphone, border: "hover:border-[#D4AF37]/40" },
                    { id: "hotel", label: "제휴 카지노호텔", val: "호이아나 비취리조트", icon: Hotel, border: "hover:border-white/20" },
                  ].map((contact, i) => (
                    <div
                      key={contact.id}
                      onClick={contact.id !== "hotel" ? () => handleCopyTarget(contact.val, contact.label) : undefined}
                      className={`bg-[#0c0c0c] border border-white/5 px-4 py-4 rounded-none cursor-pointer transition-all duration-300 ${contact.border} flex flex-col items-center justify-center group hover:bg-[#D4AF37]/5`}
                    >
                      <contact.icon className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform mb-1.5" />
                      <span className="text-[9px] text-white/40 group-hover:text-[#D4AF37] transition-colors uppercase font-bold font-sans tracking-[0.15em]">{contact.label}</span>
                      <span className="text-xs text-white group-hover:text-white font-bold tracking-wider truncate max-w-full font-mono mt-1">{contact.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Indicator */}
              <div className="absolute bottom-6 left-1/3 right-1/3 flex justify-center gap-1.5 z-10">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      heroSlideIdx === idx ? "w-6 bg-gold-400" : "w-1.5 bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* 7. HOW IT WORKS PROCEDURAL STEPS */}
            <section className="py-24 bg-luxury-black relative z-10-timeline border-t border-b border-white/5">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] text-gold-400 tracking-[0.4em] font-medium block uppercase">
                    <Trans ko="VIP 컨시어지 의전 및 연계 진행 절차">PROCEDURAL HOW IT WORKS</Trans>
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                    VIP 컨시어지 이용 진행 방식 단계
                  </h2>
                  <div className="h-[1px] w-20 bg-[#D4AF37]/40 mx-auto my-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  {[
                    { step: "01", title: "카카오톡 / 텔레그램 문의", desc: "당사의 비밀 암호 라인을 활용하여 부담 없이 실시간 1:1 문의를 개설합니다." },
                    { step: "02", title: "원하는 일정 및 스타일 상담", desc: "바이인 예산, 골프장 선호 시간, 마사지 수질 등 원하시는 니즈를 전하고 디자인을 잡습니다." },
                    { step: "03", title: "카지노 혜택 및 일정 매칭 보완", desc: "등급에 따른 비즈니스 기단 승객권, 5성 빌라 숙박권 등 투명한 무료 컴프 등급을 환산 받습니다." },
                    { step: "04", title: "공항 의전 게이트 착륙 후 케어 개시", desc: "공항 VIP 전담 심사 요원이 직접 마중하며 대기 시간 0초 카지노 차량 승차로 여정이 완성됩니다." },
                  ].map((st, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0c0c0c] border border-white/10 p-6 rounded-none relative space-y-3 flex flex-col justify-between group hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all duration-300 min-h-[220px]"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-serif italic text-3xl font-light text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors duration-300">
                            {st.step}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                        </div>
                        
                        <h3 className="font-display font-bold text-xs md:text-sm text-white tracking-widest uppercase">
                          {st.title}
                        </h3>
                        
                        <p className="text-xs text-white/50 leading-relaxed font-sans group-hover:text-white/70">
                          {st.desc}
                        </p>
                      </div>

                      <div className="pt-2 text-[10px] text-white/40 font-mono tracking-widest font-semibold uppercase border-t border-white/5 mt-2">
                        완료 단계
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. SECURED PRIVATE COUNSEL FORM SECTION */}
            <section id="counsel" className="py-24 bg-[#050505] relative z-10">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm
                  onSubmitSuccess={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                  }}
                />
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "benefits" && (
          <motion.div
            key="page-benefits"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* Page Header Banner */}
            <div className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black pt-20">
              <img
                src="https://images.openai.com/static-rsc-4/KwLL_NTtXLUH7294hl_c9wgWP0BKKO4_hq7OC0vm3_GeQ60iFBdcKgCL2kfdvlskrz8Hya9Z70skOuyDketB3U0PJRBWrTcSvaeRVpJ9DKTlBpR7C-w45Ga-UNfB-laP62nYuiCqMs6tkn8h1-pd-RFu47s9vGtRUyuBTEtEV6_MHfchDO3fsHmAfBvX4dpf?purpose=fullsize"
                alt="Casino banner"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-transparent" />
              <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mx-auto mt-8">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1">
                  VVIP INTEL DIRECT
                </span>
                <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-none">
                  다낭 카지노 단독 8대 VIP 혜택
                </h1>
                <p className="text-xs md:text-sm text-white/55 tracking-widest uppercase font-mono">
                  크라운 플라자 · 호이아나 공식 제휴 명품 우수 콤프 정산 특권
                </p>
              </div>
            </div>

            {/* 3. CASINO VIP BENEFITS SECTION */}
            <section id="benefits" className="py-20 bg-luxury-black relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                {/* Main copys */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-medium block uppercase">
                    <Trans ko="카지노 VIP 특별 우대 혜택">Casino Vip Benefits</Trans>
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                    다낭 카지노 단독 8대 VIP 혜택 자세히 보기
                  </h2>
                  <div className="h-[1px] w-20 bg-[#D4AF37]/40 mx-auto my-3" />
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    고객님의 배팅 규모와 방문 성향에 맞춰 차별화되고 완전한 투명 콤프 혜택을 제공합니다.<br />
                    기밀 노출 방지원칙 수여로 안전하고 정직한 정산 체계를 전일 케어 가동합니다.
                  </p>
                </div>

                {/* Benefits Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, idx) => (
                    <div
                      key={benefit.id}
                      onClick={() => setSelectedDetail({
                        title: benefit.title,
                        subtitle: benefit.badge,
                        description: benefit.detail,
                        tags: [benefit.badge || "특별 특전 요약"],
                        bullets: [
                          "전일 24시간 에스코터 긴급 의전 지원",
                          "현금 및 현지 원화/달러 수발 보안 서비스",
                          "개별 동선 변경 시 무료 리무진 기동 대기"
                        ]
                      })}
                      className="bg-[#0c0c0c] border border-white/10 hover:border-[#D4AF37]/45 p-8 rounded-none relative transition-colors duration-300 group cursor-pointer hover:bg-[#D4AF37]/5 flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[#D4AF37] font-serif italic text-2xl tracking-normal">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-colors">
                            {getBenefitIcon(benefit.iconName)}
                          </div>
                        </div>

                        {benefit.badge && (
                          <span className="text-[9px] text-[#D4AF37] tracking-[0.2em] font-extrabold uppercase border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-2 py-0.5">
                            {benefit.badge}
                          </span>
                        )}

                        <h3 className="font-display font-bold text-sm tracking-widest text-white uppercase group-hover:text-[#D4AF37] transition-colors mt-4">
                          {benefit.title}
                        </h3>

                        <p className="text-xs text-white/50 font-sans leading-relaxed mt-2 line-clamp-3 group-hover:text-white/70 transition-colors">
                          {benefit.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-[#D4AF37] font-bold tracking-[0.15em] uppercase">
                        <span>자세히 보기</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Caution Banner for VIP security */}
                <div className="bg-[#0c0c0c] border border-white/10 rounded-none p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <div className="text-[#D4AF37] text-xs font-bold leading-tight uppercase flex items-center justify-center md:justify-start gap-2">
                      <Shield className="w-4 h-4 text-[#D4AF37]" />
                      <Trans ko="공개 해제 불가 VVIP 극밀 우대 특전">공개 되지 않는 VVIP 극밀 등급 혜택</Trans>
                    </div>
                    <p className="text-xs text-white/50 font-sans leading-relaxed">
                      블랙잭 하객, 대형 바카라 하이롤러 등 맞춤 롤링 콤프 정산과 항공 보존 등급은 1:1 비밀 무장 메신저 상담에서만 투명하게 제공됩니다.
                    </p>
                  </div>
                  <button
                    onClick={() => handleScrollToSection("counsel")}
                    className="w-full md:w-auto py-3 px-8 bg-[#D4AF37] hover:bg-[#bfa032] text-black font-extrabold text-[11px] tracking-widest rounded-none transition-all uppercase whitespace-nowrap cursor-pointer"
                  >
                    VIP 비밀 라인 상담받기
                  </button>
                </div>
              </div>
            </section>

            {/* Counsel Section */}
            <section id="counsel" className="py-20 bg-[#050505] relative z-10 border-t border-white/5">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm />
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "golfvillas" && (
          <motion.div
            key="page-golfvillas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* Page Header Banner */}
            <div className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black pt-20">
              <img
                src="https://images.openai.com/static-rsc-4/EinSOgbg0UfGLuucxMbBHX_3h-mF_lz-dEdbkZmpph28biGxek4NtcNGDhAkp03z0RWuy2-GTFCS0PW8kGW-Gf7Puh-MJXjCIG-W45MoLFk3_CKt3XCjFAq1U8kJX3W9EiSsEPI-FP40Ryrl2SufKit4asUe78BcvYNbpVJ41cBCZXe-Jrl028GWRNl9ylAv?purpose=fullsize"
                alt="Golf banner"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-transparent" />
              <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mx-auto mt-8">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1">
                  PRESTIGE LEISURE MAP
                </span>
                <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-none">
                  골프 &amp; 독채 풀빌라
                </h1>
                <p className="text-xs md:text-sm text-white/55 tracking-widest uppercase font-sans">
                  낮에는 명문 링크스 필드 황금타임 프리패스, 밤에는 프라이빗 수변 풀빌라
                </p>
              </div>
            </div>

            {/* 4. GOLF & PULVILLA SECTION */}
            <section id="golfvillas" className="py-20 bg-luxury-black relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                
                {/* Section Copys */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] text-gold-400 tracking-[0.4em] font-medium block uppercase">
                    <Trans ko="최고급 명문 골프코스 & 프라이빗 독채 풀빌라">High-End Golf & Private Villas</Trans>
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                    낮에는 명품 링크스 골프, 밤에는 VVIP 라이프
                  </h2>
                  <div className="h-[1px] w-20 bg-gold-600/50 mx-auto my-3" />
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
                    다낭 최고의 명문 골프코스 황금 타임 프리 패스 및 누구의 시선도 차단되는 최고급 독채 수변 풀빌라를 제공합니다. <br />
                    전담 에이전트 소유 의전 리무진과 완벽한 밀착 서포터로 최고의 여정을 보장합니다.
                  </p>
                </div>

                {/* Places grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {INITIAL_GOLF_VILLAS.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5"
                    >
                      {/* Left Side: Thumbnail with tag overlay */}
                      <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-[#0c0c0c]" />
                      </div>

                      {/* Right Side: content */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 2).map((t, i) => (
                              <span key={i} className="text-[8px] tracking-[0.15em] text-[#D4AF37] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-2 py-0.5 rounded-none">
                                {t}
                              </span>
                            ))}
                          </div>
                          
                          <h3 className="font-display font-medium text-xs md:text-sm text-white tracking-widest leading-none mt-2 uppercase">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-white/40 font-mono tracking-widest leading-none uppercase">
                            {item.englishName}
                          </p>

                          <p className="text-xs text-white/50 leading-relaxed font-sans line-clamp-3 pt-1">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40 tracking-wider truncate max-w-[150px] font-mono">{item.locationDetails}</span>
                          <button
                            onClick={() => setSelectedDetail({
                              title: item.name,
                              subtitle: item.englishName,
                              imageUrl: item.imageUrl,
                              tags: item.tags,
                              description: item.description,
                              bullets: item.features,
                              locationDetails: item.locationDetails
                            })}
                            className="px-4 py-2 border border-white/10 hover:border-[#D4AF37] text-white hover:text-black hover:bg-[#D4AF37] text-[10px] font-extrabold rounded-none tracking-widest transition-all duration-300 cursor-pointer"
                          >
                            코스 보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Counsel Section */}
            <section id="counsel" className="py-20 bg-[#050505] relative z-10 border-t border-white/5">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm />
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "nightlife" && (
          <motion.div
            key="page-nightlife"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* Page Header Banner */}
            <div className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black pt-20">
              <img
                src="https://images.openai.com/static-rsc-4/GSdEqajGvtXCBF8904xASh8b_pZqctTx1AzbygVrfl970KEyyqqHsuWVl51KQffmnyqbMCAqvL_BV9x2tARQT6KeYa_70ys8MFCD-lcet5kaBtZXI7cgoZTwJlr04Rm_mIWFHD1AlBZv2gonDRQYG-KOoxFTC2BlRmKn4RBFeMuOkmFjyfdoCl5KY2V1r3l9?purpose=fullsize"
                alt="Nightlife banner"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-transparent" />
              <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mx-auto mt-8">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1">
                  SACRED PRIVACY PROTECTION
                </span>
                <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-none">
                  밤문화 엔터테인먼트
                </h1>
                <p className="text-xs md:text-sm text-white/55 tracking-widest uppercase font-sans">
                  사생활이 완벽 방어되는 최고 등급 에스코터 및 가이드 VIP 의전 수호
                </p>
              </div>
            </div>

            {/* 5. DANANG NIGHT EXPERIENCE SECTION */}
            <section id="nightlife" className="py-20 bg-luxury-black relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                
                {/* Title column */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] text-gold-450 tracking-[0.4em] font-medium block uppercase">
                    <Trans ko="다낭 밤문화 엔터테인먼트 여정 및 에스코트">Danang Midnight Experience</Trans>
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                    다낭 밤의 정점을 누리는 유일한 방식
                  </h2>
                  <div className="h-[1px] w-20 bg-gold-600/50 mx-auto my-3" />
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    불편하고 우려스러운 밤길, 현지 가용 인력의 미묘한 시선을 완벽히 무산시킵니다. <br />
                    VVIP 전용 스카이라인 및 해변 클럽을 통틀어 완벽 밀밀 에스코트 대기를 맛보세요.
                  </p>
                </div>

                {/* Cards slider */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {INITIAL_NIGHT_EXPERIENCES.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/5"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
                        <span className="absolute bottom-3 left-4 text-[8px] tracking-[0.15em] text-[#D4AF37] bg-[#0c0c0c]/85 border border-[#D4AF37]/35 px-2.5 py-1 rounded-none font-extrabold uppercase">
                          {item.vibeBadge}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h3 className="font-display font-medium text-xs md:text-sm text-white tracking-widest uppercase">
                            {item.title}
                          </h3>
                          <p className="text-[9px] text-[#D4AF37]/80 font-mono tracking-widest leading-none uppercase">
                            {item.englishTitle}
                          </p>
                          <p className="text-xs text-white/50 leading-relaxed pt-1 font-sans line-clamp-3 group-hover:text-white/70">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                          <span className="text-[10px] text-white/40 tracking-wide font-mono">코디네이터 배정</span>
                          <button
                            onClick={() => setSelectedDetail({
                              title: item.title,
                              subtitle: item.englishTitle,
                              imageUrl: item.imageUrl,
                              tags: [item.vibeBadge],
                              description: item.description,
                              bullets: item.details
                            })}
                            className="text-[10px] font-extrabold text-[#D4AF37] hover:text-white transition-colors cursor-pointer tracking-wider flex items-center gap-1.5"
                          >
                            <span>의전 안내</span>
                            <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Counsel Section */}
            <section id="counsel" className="py-20 bg-[#050505] relative z-10 border-t border-white/5">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm />
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "portfolio" && (
          <motion.div
            key="page-portfolio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* Page Header Banner */}
            <div className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black pt-20">
              <img
                src="https://images.openai.com/static-rsc-4/GSdEqajGvtXCBF8904xASh8b_pZqctTx1AzbygVrfl970KEyyqqHsuWVl51KQffmnyqbMCAqvL_BV9x2tARQT6KeYa_70ys8MFCD-lcet5kaBtZXI7cgoZTwJlr04Rm_mIWFHD1AlBZv2gonDRQYG-KOoxFTC2BlRmKn4RBFeMuOkmFjyfdoCl5KY2V1r3l9?purpose=fullsize"
                alt="Stories banner"
                className="absolute inset-0 w-full h-full object-cover opacity-15"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-transparent" />
              <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mx-auto mt-8">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1">
                  TRUSTED AND SECURED
                </span>
                <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-none">
                  실제 고객 이용 여정기
                </h1>
                <p className="text-xs md:text-sm text-white/55 tracking-widest uppercase font-sans">
                  다낭 VIP 프라이빗 서비스를 다녀오신 정회원들이 한 권의 일기처럼 전해온 진솔 자필 기록
                </p>
              </div>
            </div>

            {/* 6. REAL CLIENT EXPERIENCE PORTFOLIOS */}
            <section id="portfolio" className="py-20 bg-luxury-black relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-[10px] text-gold-450 tracking-[0.4em] font-medium block uppercase">
                      <Trans ko="다낭 VVIP 정회원 실제 이용자 자필 후기">DANANG REAL VIP STORIES</Trans>
                    </span>
                    <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                      실제 VIP 멤버십 고객 여정 후기 목록
                    </h2>
                    <div className="h-[1px] w-20 bg-gold-500" />
                  </div>
                  <p className="text-xs text-gray-500 font-sans max-w-sm leading-relaxed">
                    *고객 사생활 보호 및 밀행 보장 약정에 의거하여 기입된 명칭은 모두 가명 및 축약 처리되었음을 정중히 고지드립니다.
                  </p>
                </div>

                {/* Testimonial cards list generated dynamically */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {portfolios.map((port) => (
                    <div
                      key={port.id}
                      className="bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/2 shadow-xl"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={port.imageUrl}
                            alt={port.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                          
                          <span className="absolute bottom-3 left-4 text-[9px] text-[#D4AF37] bg-[#0c0c0c]/90 border border-[#D4AF37]/35 px-2.5 py-0.5 rounded-none font-bold uppercase tracking-[0.15em]">
                            {port.clientType}
                          </span>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between text-xs text-white/50">
                            <span className="font-semibold text-gold-200">여정기한: {port.duration}</span>
                            <div className="flex gap-0.5 text-[#D4AF37]">
                              {Array.from({ length: port.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                              ))}
                            </div>
                          </div>

                          <h3 className="font-display font-bold text-xs md:text-sm text-white tracking-widest uppercase leading-relaxed">
                            {port.title}
                          </h3>
                          
                          <p className="text-xs text-white/60 leading-relaxed font-sans italic">
                            &ldquo;{port.testimonial}&rdquo;
                          </p>

                          <div className="border-t border-white/5 pt-4 space-y-2">
                            <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.15em] leading-none">밀행 핵심 요약:</div>
                            <ul className="space-y-1.5">
                              {port.highlights.map((high, i) => (
                                <li key={i} className="text-xs text-white/50 flex items-start gap-1.5">
                                  <span className="text-[#D4AF37] font-black text-xs leading-none mt-0.5">•</span>
                                  <span>{high}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-transparent">
                        <button
                          onClick={() => handleScrollToSection("counsel")}
                          className="w-full py-3 bg-white/5 hover:bg-[#D4AF37]/10 text-[#D4AF37] hover:text-white border border-white/10 hover:border-[#D4AF37]/40 text-xs font-bold rounded-none tracking-widest transition-colors cursor-pointer"
                        >
                          이와 유사한 비밀 일정 문의하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Counsel Section */}
            <section id="counsel" className="py-20 bg-[#050505] relative z-10 border-t border-white/5">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm />
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "blogs" && (
          <motion.div
            key="page-blogs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {/* Page Header Banner */}
            <div className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black pt-20">
              <img
                src="https://images.openai.com/static-rsc-4/EinSOgbg0UfGLuucxMbBHX_3h-mF_lz-dEdbkZmpph28biGxek4NtcNGDhAkp03z0RWuy2-GTFCS0PW8kGW-Gf7Puh-MJXjCIG-W45MoLFk3_CKt3XCjFAq1U8kJX3W9EiSsEPI-FP40Ryrl2SufKit4asUe78BcvYNbpVJ41cBCZXe-Jrl028GWRNl9ylAv?purpose=fullsize"
                alt="Columns banner"
                className="absolute inset-0 w-full h-full object-cover opacity-15"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-transparent" />
              <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl mx-auto mt-8">
                <span className="text-[10px] text-[#D4AF37] tracking-[0.4em] font-extrabold uppercase border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1">
                  VVIP TRAVEL INTELLIGENCE
                </span>
                <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-none">
                  다낭 알짜 정보 칼럼
                </h1>
                <p className="text-xs md:text-sm text-white/55 tracking-widest uppercase font-sans">
                  대표 분석 전문가들이 집필한 크라운 및 호이아나 카지노 의전 콤프 공략 핵심 가이드집
                </p>
              </div>
            </div>

            {/* 8. SEO MARKETING BLOGS COLUMNS SECTION */}
            <section id="blogs" className="py-20 bg-luxury-black relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] text-gold-400 tracking-[0.4em] font-medium block uppercase">
                    <Trans ko="VVIP 프라이빗 여행 칼럼 & 콤프 공략 가이드">VVIP VIP PRIVATE TRAVEL COLUMN</Trans>
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-widest uppercase">
                    다낭 VIP 여행 비결 & 마케팅 칼럼
                  </h2>
                  <div className="h-[1px] w-20 bg-gold-600/50 mx-auto my-3" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    다움 카지노 이용 시 유입되는 콤프 지원법과 명문 골프 플레이 비용 분석 등 당사 대표 분석 칼럼진이 작성한 고급 현지 인사이트를 정독해보세요.
                  </p>
                </div>

                <BlogSection
                  blogs={blogs}
                  onConsultClick={() => handleScrollToSection("counsel")}
                />
              </div>
            </section>

            {/* Counsel Section */}
            <section id="counsel" className="py-20 bg-[#050505] relative z-10 border-t border-white/5">
              <div className="max-w-4xl mx-auto px-4 md:px-8">
                <CounselForm />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. LUXURY FOOTER DECK */}
      <footer className="bg-luxury-black border-t border-gray-905 pt-12 pb-28 md:pb-12 relative z-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-gray-900">
            {/* Left */}
            <div className="text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-1.5">
                <Compass className="w-5 text-gold-400" />
                <span className="font-display font-medium text-white tracking-[0.3em] uppercase">DANANG PRIVATE VIP</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-md">
                다낭 로컬 크라운 플라자, 호이아나 공식 제휴 롤링 하우스 법인 에이전트. 비공개 맞춤 비서 의전 지원.
              </p>
            </div>

            {/* Right Quick Menu */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { id: "hero", label: "HOME" },
                { id: "benefits", label: "BENEFITS" },
                { id: "golfvillas", label: "GOLF & VILLA" },
                { id: "nightlife", label: "NIGHTLIFE" },
                { id: "blogs", label: "COLUMNS" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleScrollToSection(m.id)}
                  className="hover:text-gold-400 hover:underline transition-colors cursor-pointer text-[10px] tracking-wider uppercase font-semibold"
                >
                  {m.label}
                </button>
              ))}
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="px-2 py-1.5 bg-luxury-gray text-gold-400 text-[10px] font-bold rounded flex items-center gap-1 transition-all cursor-pointer border border-gold-800/20 hover:border-gold-400"
              >
                ADMIN PANEL
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] leading-relaxed">
            <div className="text-center md:text-left space-y-1">
              <p>© 2026 DANANG PRIVATE VIP MEMEBERS. ALL RIGHTS SECURED.</p>
              <p>Disclaimer: 본 서비스는 다낭 정부 및 공인 하우스크레딧 법에 의거하여 면허(License)를 지닌 정식 리조트 인프라와 상응하여 합법 수발 일정만 조율합니다.</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-gray-600 font-medium whitespace-nowrap">
              <span>● 비밀유지 가드조</span>
              <span>● 마이바흐 안전의전</span>
              <span>● 암호 텔레라인</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 11. REUSABLE COMPLEX FULL SPECS MODAL POPUP */}
      {selectedDetail && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedDetail(null)}
          title={selectedDetail.title}
          subtitle={selectedDetail.subtitle}
          imageUrl={selectedDetail.imageUrl}
          tags={selectedDetail.tags}
          description={selectedDetail.description}
          bullets={selectedDetail.bullets}
          locationDetails={selectedDetail.locationDetails}
          onCtaClick={() => handleScrollToSection("counsel")}
        />
      )}

      {/* 12. COMPLEX AND GUARANTEED VVIP ADMIN CONTROL DASHBOARD OVERLAY */}
      {isAdminPanelOpen && (
        <AdminPanel
          onClose={() => setIsAdminPanelOpen(false)}
          onLoginStatusChange={(status) => setIsAdminLoggedIn(status)}
          portfolios={portfolios}
          setPortfolios={setPortfolios}
          blogs={blogs}
          setBlogs={setBlogs}
          benefits={benefits}
          setBenefits={setBenefits}
        />
      )}

    </div>
  );
}
