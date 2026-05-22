/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Eye, Trash2, Edit3, Plus, CheckCircle, Clock, Check, X, ShieldAlert, Award, FileText, Send, Layers } from "lucide-react";
import { PortfolioExperience, BlogArticle, CounselRequest, CasinoBenefit } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  onLoginStatusChange: (isLoggedIn: boolean) => void;
  // State multipliers
  portfolios: PortfolioExperience[];
  setPortfolios: React.Dispatch<React.SetStateAction<PortfolioExperience[]>>;
  blogs: BlogArticle[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogArticle[]>>;
  benefits: CasinoBenefit[];
  setBenefits: React.Dispatch<React.SetStateAction<CasinoBenefit[]>>;
}

export default function AdminPanel({
  onClose,
  onLoginStatusChange,
  portfolios,
  setPortfolios,
  blogs,
  setBlogs,
  benefits,
  setBenefits
}: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Tab Management
  const [activeTab, setActiveTab] = useState<"portfolios" | "counsels" | "blogs" | "benefits">("portfolios");

  // Counseling requests state loaded from localStorage
  const [counsels, setCounsels] = useState<CounselRequest[]>([]);

  // Item form editing state
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingBenefitId, setEditingBenefitId] = useState<string | null>(null);

  // Form Fields - Portfolio
  const [portTitle, setPortTitle] = useState("");
  const [portDesc, setPortDesc] = useState("");
  const [portClient, setPortClient] = useState("");
  const [portRating, setPortRating] = useState(5);
  const [portImg, setPortImg] = useState("");
  const [portDuration, setPortDuration] = useState("");
  const [portHighlights, setPortHighlights] = useState("");
  const [portTestimonial, setPortTestimonial] = useState("");

  // Form Fields - Blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogSnippet, setBlogSnippet] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // Form Fields - Benefit
  const [benefitTitle, setBenefitTitle] = useState("");
  const [benefitDesc, setBenefitDesc] = useState("");
  const [benefitDetail, setBenefitDetail] = useState("");
  const [benefitBadge, setBenefitBadge] = useState("");

  useEffect(() => {
    // Check if already authorized in current session
    const sessionAuth = sessionStorage.getItem("danang_vip_admin_auth") === "true";
    if (sessionAuth) {
      setIsAuthorized(true);
      onLoginStatusChange(true);
    }
    loadCounsels();
  }, []);

  const loadCounsels = () => {
    const data = localStorage.getItem("danang_vip_counsels");
    if (data) {
      try {
        const parsed: CounselRequest[] = JSON.parse(data);
        // Sort newest first
        parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setCounsels(parsed);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1224asas!!") {
      setIsAuthorized(true);
      setLoginError("");
      sessionStorage.setItem("danang_vip_admin_auth", "true");
      onLoginStatusChange(true);
    } else {
      setLoginError("비밀번호가 올바르지 않습니다. 다시 입력해주십시오.");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPassword("");
    sessionStorage.removeItem("danang_vip_admin_auth");
    onLoginStatusChange(false);
  };

  // Counsel actions
  const changeCounselStatus = (id: string, status: CounselRequest["status"]) => {
    const updated = counsels.map((req) => {
      if (req.id === id) {
        return { ...req, status };
      }
      return req;
    });
    localStorage.setItem("danang_vip_counsels", JSON.stringify(updated));
    setCounsels(updated);
  };

  const deleteCounsel = (id: string) => {
    if (window.confirm("이 문의 내역을 정말 영구 삭제하시겠습니까? (이 작업은 되돌릴 수 없습니다)")) {
      const updated = counsels.filter((req) => req.id !== id);
      localStorage.setItem("danang_vip_counsels", JSON.stringify(updated));
      setCounsels(updated);
    }
  };

  // Portfolio actions
  const startEditPortfolio = (item: PortfolioExperience) => {
    setEditingPortfolioId(item.id);
    setPortTitle(item.title);
    setPortDesc(item.description);
    setPortClient(item.clientType);
    setPortRating(item.rating);
    setPortImg(item.imageUrl);
    setPortDuration(item.duration);
    setPortHighlights(item.highlights.join("\n"));
    setPortTestimonial(item.testimonial || "");
  };

  const startNewPortfolio = () => {
    setEditingPortfolioId("new");
    setPortTitle("");
    setPortDesc("");
    setPortClient("VVIP 하이롤러");
    setPortRating(5);
    setPortImg("https://images.openai.com/static-rsc-4/qTpmAPvSGLQiKSvRt-h8YVCgZzJVEFH4103yaR7FGwQKB9cMV1zEa5LQ3A2-vHUnHm_gI3RSVJ_Wiey6W0WqliiirFkMg6qgrW9W5cgTs7zCsB9cmgJSIAeTQ18B-y36iO5dVho5CJ89eZD8DJqQE6B68UiHGwdWAfU70huHVa_Y_-T8OSTYFGIfx8XS3nof?purpose=fullsize");
    setPortDuration("3박 4일");
    setPortHighlights("대표 맞춤 공항 픽업 의전\n5성 리조트 풀 서포트");
    setPortTestimonial("");
  };

  const savePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArray = portHighlights.split("\n").filter((line) => line.trim() !== "");

    let updated: PortfolioExperience[];

    if (editingPortfolioId === "new") {
      const newItem: PortfolioExperience = {
        id: "port-" + Date.now(),
        title: portTitle,
        description: portDesc,
        clientType: portClient,
        rating: portRating,
        imageUrl: portImg,
        duration: portDuration,
        highlights: highlightsArray,
        testimonial: portTestimonial,
      };
      updated = [...portfolios, newItem];
    } else {
      updated = portfolios.map((p) => {
        if (p.id === editingPortfolioId) {
          return {
            ...p,
            title: portTitle,
            description: portDesc,
            clientType: portClient,
            rating: portRating,
            imageUrl: portImg,
            duration: portDuration,
            highlights: highlightsArray,
            testimonial: portTestimonial,
          };
        }
        return p;
      });
    }

    setPortfolios(updated);
    localStorage.setItem("danang_vip_portfolios", JSON.stringify(updated));
    setEditingPortfolioId(null);
  };

  const deletePortfolio = (id: string) => {
    if (window.confirm("이 VIP 후기 포트폴리오를 영구 삭제하겠습니까?")) {
      const updated = portfolios.filter((p) => p.id !== id);
      setPortfolios(updated);
      localStorage.setItem("danang_vip_portfolios", JSON.stringify(updated));
    }
  };

  // Blog actions
  const startEditBlog = (article: BlogArticle) => {
    setEditingBlogId(article.id);
    setBlogTitle(article.title);
    setBlogCategory(article.category);
    setBlogSnippet(article.snippet);
    setBlogContent(article.content);
  };

  const startNewBlog = () => {
    setEditingBlogId("new");
    setBlogTitle("");
    setBlogCategory("다낭 카지노 후기");
    setBlogSnippet("");
    setBlogContent("");
  };

  const saveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: BlogArticle[];

    if (editingBlogId === "new") {
      const newArticle: BlogArticle = {
        id: "blog-" + Date.now(),
        title: blogTitle,
        category: blogCategory,
        snippet: blogSnippet,
        content: blogContent,
        date: new Date().toISOString().split("T")[0],
        views: Math.floor(Math.random() * 100) + 1,
      };
      updated = [newArticle, ...blogs];
    } else {
      updated = blogs.map((b) => {
        if (b.id === editingBlogId) {
          return {
            ...b,
            title: blogTitle,
            category: blogCategory,
            snippet: blogSnippet,
            content: blogContent,
          };
        }
        return b;
      });
    }

    setBlogs(updated);
    localStorage.setItem("danang_vip_blogs", JSON.stringify(updated));
    setEditingBlogId(null);
  };

  const deleteBlog = (id: string) => {
    if (window.confirm("이 SEO 블로그 글을 정말 삭제하시겠습니까?")) {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      localStorage.setItem("danang_vip_blogs", JSON.stringify(updated));
    }
  };

  // Benefit Actions
  const startEditBenefit = (item: CasinoBenefit) => {
    setEditingBenefitId(item.id);
    setBenefitTitle(item.title);
    setBenefitDesc(item.description);
    setBenefitDetail(item.detail);
    setBenefitBadge(item.badge || "");
  };

  const saveBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = benefits.map((b) => {
      if (b.id === editingBenefitId) {
        return {
          ...b,
          title: benefitTitle,
          description: benefitDesc,
          detail: benefitDetail,
          badge: benefitBadge
        };
      }
      return b;
    });

    setBenefits(updated);
    localStorage.setItem("danang_vip_benefits", JSON.stringify(updated));
    setEditingBenefitId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-luxury-black/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Card */}
      <div className="bg-luxury-dark border border-gold-800/40 rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative">
        {/* Header bar */}
        <div className="border-b border-gold-900/40 px-6 py-4 flex items-center justify-between bg-luxury-black/60">
          <div className="flex items-center gap-2">
            <Lock className={`w-5 text-gold-400 ${isAuthorized ? "hidden" : "block"}`} />
            <Unlock className={`w-5 text-gold-400 ${isAuthorized ? "block" : "hidden"}`} />
            <span className="font-display font-medium text-xs tracking-[0.25em] text-white uppercase">
              Administrator Access Terminal
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-luxury-gray cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not authorized login screen */}
        {!isAuthorized ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-full bg-gold-950/50 border border-gold-500/40 flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-gold-450 text-gold-400 animate-bounce" />
            </div>
            <h2 className="font-display text-lg font-bold text-white tracking-widest mb-2 uppercase">
              VVIP CONTROL PORTAL LOCK
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              인증되지 않은 사용자는 접근이 불허합니다. <br />
              전용 6자리 기밀 비밀번호 코드 키를 투입해 주십시오.
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="보안 비밀번호 코드 입력"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded px-4 py-3 text-center tracking-[0.4em] font-bold text-white focus:outline-none transition-colors"
                  autoFocus
                  id="admin-password-input"
                />
              </div>

              {loginError && (
                <div className="text-red-400 text-xs flex items-center justify-center gap-1 bg-red-950/20 py-2 border border-red-900/20 rounded">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-amber-700 hover:from-gold-550 hover:to-amber-600 text-white font-bold text-xs tracking-widest rounded transition-all cursor-pointer"
                id="admin-login-btn"
              >
                지정 키 인증 승인
              </button>
            </form>
            <div className="mt-8 text-[10px] text-gray-600 flex items-center gap-1">
              <span>● 비밀지정: 1224asas!!</span>
            </div>
          </div>
        ) : (
          /* Authorized Dashboard */
          <div className="flex-1 flex flex-col min-h-0 bg-luxury-black/30">
            {/* Top Stat Summary Bar */}
            <div className="bg-luxury-gray/30 px-6 py-3 border-b border-gray-900/60 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 text-gold-400" />
                  <span className="text-gray-500">포트폴리오:</span>
                  <strong className="text-white font-semibold">{portfolios.length}건</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 text-gold-400" />
                  <span className="text-gray-500">블로그:</span>
                  <strong className="text-white font-semibold">{blogs.length}건</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Send className="w-4 text-gold-400" />
                  <span className="text-gray-500">실시간 유입상담:</span>
                  <strong className="text-gold-400 font-semibold">{counsels.length}건</strong>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 text-[10px] bg-red-950/30 text-red-400 border border-red-900/30 hover:bg-red-900/20 rounded flex items-center gap-1 transition-all cursor-pointer"
                id="admin-logout-btn"
              >
                <Lock className="w-3 h-3" /> 대행 세션 종료
              </button>
            </div>

            {/* Dashboard Workspace */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-56 border-r border-gold-900/20 bg-luxury-black/50 p-4 flex flex-col gap-1">
                <div className="text-[9px] text-gold-400 tracking-[0.25em] font-bold px-3 mb-3 uppercase">
                  Workspace menu
                </div>
                {[
                  { id: "portfolios", name: "VIP 경험 포트폴리오", icon: Award },
                  { id: "counsels", name: "신수정 실시간 상담함", icon: Send, badge: counsels.filter(c => c.status === "pending").length },
                  { id: "blogs", name: "SEO 블로그 칼럼", icon: FileText },
                  { id: "benefits", name: "카지노 8대 혜택 텍스트", icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setEditingPortfolioId(null);
                        setEditingBlogId(null);
                        setEditingBenefitId(null);
                      }}
                      className={`w-full py-2.5 px-3 rounded flex items-center justify-between text-xs transition-all cursor-pointer text-left font-medium ${
                        active
                          ? "bg-gold-500/10 border border-gold-500/30 text-gold-400"
                          : "text-gray-400 hover:text-white hover:bg-luxury-gray/40 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </span>
                      {!!tab.badge && (
                        <span className="bg-gold-500 text-luxury-black font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main Tab Area */}
              <div className="flex-1 p-6 overflow-y-auto min-h-0 bg-luxury-dark/40" id="admin-main-workspace">
                
                {/* 1. PORTFOLIOS TAB */}
                {activeTab === "portfolios" && (
                  <div className="space-y-6">
                    {editingPortfolioId ? (
                      /* Portfolio Form */
                      <form onSubmit={savePortfolio} className="space-y-4 bg-luxury-gray/30 p-5 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-900">
                          <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                            {editingPortfolioId === "new" ? "새 포트폴리오 후기 추가" : "포트폴리오 후기 수정"}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setEditingPortfolioId(null)}
                            className="text-gray-400 hover:text-white text-xs cursor-pointer"
                          >
                            취소
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">여정 한여제(제목)</label>
                            <input
                              type="text"
                              required
                              value={portTitle}
                              onChange={(e) => setPortTitle(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">고객 등급 / 군</label>
                            <input
                              type="text"
                              required
                              value={portClient}
                              onChange={(e) => setPortClient(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">체크 이미지 URL</label>
                            <select
                              value={portImg}
                              onChange={(e) => setPortImg(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white mb-2"
                            >
                              <option value="https://images.openai.com/static-rsc-4/qTpmAPvSGLQiKSvRt-h8YVCgZzJVEFH4103yaR7FGwQKB9cMV1zEa5LQ3A2-vHUnHm_gI3RSVJ_Wiey6W0WqliiirFkMg6qgrW9W5cgTs7zCsB9cmgJSIAeTQ18B-y36iO5dVho5CJ89eZD8DJqQE6B68UiHGwdWAfU70huHVa_Y_-T8OSTYFGIfx8XS3nof?purpose=fullsize">카지노 VIP룸 (Casino VIP Saloon)</option>
                              <option value="https://images.openai.com/static-rsc-4/GSdEqajGvtXCBF8904xASh8b_pZqctTx1AzbygVrfl970KEyyqqHsuWVl51KQffmnyqbMCAqvL_BV9x2tARQT6KeYa_70ys8MFCD-lcet5kaBtZXI7cgoZTwJlr04Rm_mIWFHD1AlBZv2gonDRQYG-KOoxFTC2BlRmKn4RBFeMuOkmFjyfdoCl5KY2V1r3l9?purpose=fullsize">럭셔리 요트 석양 (Yacht Cruising)</option>
                              <option value="https://images.openai.com/static-rsc-4/EinSOgbg0UfGLuucxMbBHX_3h-mF_lz-dEdbkZmpph28biGxek4NtcNGDhAkp03z0RWuy2-GTFCS0PW8kGW-Gf7Puh-MJXjCIG-W45MoLFk3_CKt3XCjFAq1U8kJX3W9EiSsEPI-FP40Ryrl2SufKit4asUe78BcvYNbpVJ41cBCZXe-Jrl028GWRNl9ylAv?purpose=fullsize">개인 헬륨 비행 (Private Helicopter Transfer)</option>
                              <option value="https://images.openai.com/static-rsc-4/3E3wUeQ7P-8e_yE9eB9hZmYQxIhME4FS2h70dJfGNH12nPYH89MUxQ53uwTE3lMthH58EuwVOtqhWldzTaV3Er_AxHnr2ytVgd_zv6oF6yjF8KDwirbetwnqujRyi38OvQVQVMpzS74w8yyD7EraL8c4OWIN3Z-uuxveM6Yh007Wd3UWWIk1rKDcXkn_NvFx?purpose=fullsize">골프 바다조망 가든 (Sea View Golf Holes)</option>
                            </select>
                            <input
                              type="text"
                              value={portImg}
                              onChange={(e) => setPortImg(e.target.value)}
                              placeholder="직접 이미지 URL 입력"
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">만족도 별점 (1~5)</label>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                required
                                value={portRating}
                                onChange={(e) => setPortRating(Number(e.target.value))}
                                className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">여정 기한</label>
                              <input
                                type="text"
                                placeholder="예: 3박 4일"
                                required
                                value={portDuration}
                                onChange={(e) => setPortDuration(e.target.value)}
                                className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">고객 수기 평(감동 후기)</label>
                          <textarea
                            rows={3}
                            value={portTestimonial}
                            onChange={(e) => setPortTestimonial(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white font-sans resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">여정 요약 (한 줄에 하나씩 적어주세요)</label>
                          <textarea
                            rows={4}
                            required
                            placeholder="예: 공항 패스트트랙 통과 기동&#10;5성 쉐라톤 호수 최고 스위트 숙박"
                            value={portHighlights}
                            onChange={(e) => setPortHighlights(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white font-mono resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold uppercase block mb-1">짧은 브리핑 설명</label>
                          <textarea
                            rows={2}
                            required
                            value={portDesc}
                            onChange={(e) => setPortDesc(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white font-sans resize-none"
                          />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingPortfolioId(null)}
                            className="px-4 py-2 bg-luxury-gray text-gray-400 hover:text-white rounded text-xs cursor-pointer"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-gold-600 hover:bg-gold-550 text-luxury-black font-extrabold rounded text-xs cursor-pointer"
                          >
                            저장 완료
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Portfolio List View */
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-bold text-gray-400 tracking-wider">
                            고급 리얼 VIP 후기 리스트 ({portfolios.length}개 노출중)
                          </h3>
                          <button
                            onClick={startNewPortfolio}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-600 hover:bg-gold-550 text-luxury-black font-bold text-xs rounded transition-all cursor-pointer"
                            id="admin-add-portfolio-btn"
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            새 후기 추가
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {portfolios.map((item) => (
                            <div
                              key={item.id}
                              className="bg-luxury-gray/20 border border-gray-800/80 rounded-lg p-4 flex gap-4 items-start"
                            >
                              <img
                                src={item.imageUrl}
                                alt="Portfolio Preview"
                                className="w-16 h-16 object-cover rounded border border-gray-850 bg-luxury-black flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="bg-gold-950 text-gold-450 border border-gold-500/30 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold">
                                    {item.clientType}
                                  </span>
                                  <span className="text-[10px] text-gray-500">{item.duration}</span>
                                </div>
                                <h4 className="text-xs font-bold text-white truncate mt-1">{item.title}</h4>
                                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEditPortfolio(item)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-luxury-gray rounded cursor-pointer"
                                  title="수정"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deletePortfolio(item.id)}
                                  className="p-2 text-gray-550 hover:text-red-400 hover:bg-red-950/20 rounded cursor-pointer"
                                  title="삭제"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. COUNSELS TAB */}
                {activeTab === "counsels" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-900">
                      <h3 className="text-xs font-bold text-gray-400 tracking-wider">
                        접수된 VIP 1:1 리얼상담 함 ({counsels.length}건 수신)
                      </h3>
                      <button
                        onClick={loadCounsels}
                        className="text-xs text-gold-400 hover:text-white cursor-pointer"
                      >
                        새로고침
                      </button>
                    </div>

                    {counsels.length === 0 ? (
                      <div className="text-center py-16 text-gray-500 text-xs">
                        접수된 VIP 문의 일정이 현재 존재하지 않습니다.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {counsels.map((req) => (
                          <div
                            key={req.id}
                            className={`border rounded-lg p-5 transition-all text-xs ${
                              req.status === "completed"
                                ? "bg-luxury-black/40 border-gray-900/60 opacity-60"
                                : req.status === "contacted"
                                ? "bg-luxury-gray/10 border-gold-900/20"
                                : "bg-luxury-gray/30 border-gold-800/40"
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-sm text-white">{req.name} 대표님</span>
                                <span className="text-[10px] text-gray-500 font-mono">
                                  {new Date(req.createdAt).toLocaleString("ko-KR")}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    req.messengerType === "kakaotalk"
                                      ? "bg-yellow-950 text-yellow-300 border border-yellow-800/40"
                                      : req.messengerType === "telegram"
                                      ? "bg-sky-950 text-sky-300 border border-sky-800/40"
                                      : "bg-green-950 text-green-300 border border-green-800/40"
                                  }`}
                                >
                                  {req.messengerType.toUpperCase()}: {req.messengerId}
                                </span>

                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    req.status === "completed"
                                      ? "bg-gray-800 text-gray-400"
                                      : req.status === "contacted"
                                      ? "bg-gold-950 text-gold-300"
                                      : "bg-red-950 text-red-300 animate-pulse"
                                  }`}
                                >
                                  {req.status === "completed"
                                    ? "대리 종결"
                                    : req.status === "contacted"
                                    ? "상담 처리중"
                                    : "미응답 신규"}
                                </span>
                              </div>
                            </div>

                            {/* Details Details */}
                            <div className="space-y-2.5 text-gray-300 bg-luxury-black/40 p-3 rounded border border-gray-900 leading-relaxed font-sans">
                              <div>
                                <span className="text-gray-500 font-bold inline-block w-24">비상 연락처</span>
                                <span className="text-gold-200 select-all font-mono font-bold">{req.phoneNumber}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 font-bold inline-block w-24">방문 희망일</span>
                                <span>{req.preferredDate}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 font-bold inline-block w-24">관심 서비스군</span>
                                <span className="text-gray-300 font-semibold">
                                  {req.selectedCategories?.join(", ") || "일반 문의"}
                                </span>
                              </div>
                              {req.notes && (
                                <div className="border-t border-gray-900 pt-2 mt-2">
                                  <div className="text-gray-500 font-bold mb-1">특별 기밀 요청사항 및 비망 기록:</div>
                                  <p className="text-gray-200 italic whitespace-pre-wrap">{req.notes}</p>
                                </div>
                              )}
                            </div>

                            {/* Actions bar */}
                            <div className="flex gap-2 justify-end mt-4">
                              <button
                                onClick={() => deleteCounsel(req.id)}
                                className="px-2.5 py-1.5 text-gray-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent rounded cursor-pointer transition-all"
                                title="상담 영구삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                              {req.status === "pending" && (
                                <button
                                  onClick={() => changeCounselStatus(req.id, "contacted")}
                                  className="px-3 py-1 bg-gold-950 hover:bg-gold-900 text-gold-300 border border-gold-800/30 rounded text-[11px] font-bold cursor-pointer"
                                >
                                  연락 처리 중으로 변경
                                </button>
                              )}

                              {req.status !== "completed" && (
                                <button
                                  onClick={() => changeCounselStatus(req.id, "completed")}
                                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-[11px] font-bold cursor-pointer"
                                >
                                  상담 종결 처리
                                </button>
                              )}
                              
                              {req.status === "completed" && (
                                <button
                                  onClick={() => changeCounselStatus(req.id, "pending")}
                                  className="px-3 py-1 bg-luxury-gray hover:bg-luxury-black border border-gray-800 text-gray-400 hover:text-white rounded text-[11px] font-bold cursor-pointer"
                                >
                                  미접수로 복구
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. BLOGS TAB */}
                {activeTab === "blogs" && (
                  <div className="space-y-6">
                    {editingBlogId ? (
                      /* Blog Edit Form */
                      <form onSubmit={saveBlog} className="space-y-4 bg-luxury-gray/30 p-5 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-900">
                          <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                            {editingBlogId === "new" ? "새 블로그 칼럼 추가" : "블로그 칼럼 수정"}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setEditingBlogId(null)}
                            className="text-gray-400 hover:text-white text-xs cursor-pointer"
                          >
                            취소
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold block mb-1">글 제목</label>
                            <input
                              type="text"
                              required
                              value={blogTitle}
                              onChange={(e) => setBlogTitle(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold block mb-1">분류 카테고리 (SEO 주요 검색 키워드용)</label>
                            <input
                              type="text"
                              required
                              placeholder="예: 다낭 카지노 후기, 다낭 골프 여행, 다낭 풀빌라 추천"
                              value={blogCategory}
                              onChange={(e) => setBlogCategory(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold block mb-1">스니펫 (짧은 미리보기 설명)</label>
                          <input
                            type="text"
                            required
                            value={blogSnippet}
                            onChange={(e) => setBlogSnippet(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold block mb-1">메인 상세 글 내용 (개행으로 단락 구분 가능)</label>
                          <textarea
                            rows={8}
                            required
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white font-sans resize-none"
                          />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingBlogId(null)}
                            className="px-4 py-2 bg-luxury-gray text-gray-400 hover:text-white rounded text-xs cursor-pointer"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-gold-600 hover:bg-gold-550 text-luxury-black font-extrabold rounded text-xs cursor-pointer"
                          >
                            발행 완료
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Blog List view */
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-bold text-gray-400 tracking-wider">
                            발행된 마케팅 검색 유입 칼럼 ({blogs.length}건 등록됨)
                          </h3>
                          <button
                            onClick={startNewBlog}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-600 hover:bg-gold-550 text-luxury-black font-bold text-xs rounded transition-all cursor-pointer"
                            id="admin-add-blog-btn"
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            새 칼럼 발행
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {blogs.map((item) => (
                            <div
                              key={item.id}
                              className="bg-luxury-gray/20 border border-gray-800/80 rounded-lg p-3.5 flex justify-between items-start text-xs"
                            >
                              <div className="min-w-0 pr-4">
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="text-gold-400 font-bold">{item.category}</span>
                                  <span className="text-gray-500 font-mono">{item.date}</span>
                                  <span className="text-gray-500">조회수: {item.views}</span>
                                </div>
                                <h4 className="font-bold text-white truncate mt-1">{item.title}</h4>
                                <p className="text-[11px] text-gray-405 text-gray-400 line-clamp-1 mt-0.5">{item.snippet}</p>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  onClick={() => startEditBlog(item)}
                                  className="p-1.5 text-gray-400 hover:text-white hover:bg-luxury-gray rounded cursor-pointer"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteBlog(item.id)}
                                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/20 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. BENEFITS TAB */}
                {activeTab === "benefits" && (
                  <div className="space-y-4">
                    {editingBenefitId ? (
                      /* Benefit Edit Form */
                      <form onSubmit={saveBenefit} className="space-y-4 bg-luxury-gray/30 p-5 border border-gray-800 rounded-lg">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-900">
                          <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                            8대 혜택 카드 내용 수정
                          </h4>
                          <button
                            type="button"
                            onClick={() => setEditingBenefitId(null)}
                            className="text-gray-400 hover:text-white text-xs cursor-pointer"
                          >
                            취소
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold block mb-1">혜택 항목명</label>
                            <input
                              type="text"
                              required
                              value={benefitTitle}
                              onChange={(e) => setBenefitTitle(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gold-400 font-bold block mb-1">혜택 배지라벨</label>
                            <input
                              type="text"
                              required
                              value={benefitBadge}
                              onChange={(e) => setBenefitBadge(e.target.value)}
                              className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold block mb-1">간략 요약 설명 (그리드 카드용)</label>
                          <input
                            type="text"
                            required
                            value={benefitDesc}
                            onChange={(e) => setBenefitDesc(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gold-400 font-bold block mb-1">세부 혜택 팝업 설명</label>
                          <textarea
                            rows={4}
                            required
                            value={benefitDetail}
                            onChange={(e) => setBenefitDetail(e.target.value)}
                            className="w-full bg-luxury-black border border-gray-800 focus:border-gold-500 rounded p-2 text-xs text-white font-sans resize-none"
                          />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingBenefitId(null)}
                            className="px-4 py-2 bg-luxury-gray text-gray-400 hover:text-white rounded text-xs cursor-pointer"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-gold-600 hover:bg-gold-550 text-luxury-black font-extrabold rounded text-xs cursor-pointer"
                          >
                            저장 완료
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Benefit List View */
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-bold text-gray-400 tracking-wider">
                            카지노 8대 핵심 혜택 리스트 (문구 즉시 변경 가능)
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {benefits.map((item) => (
                            <div
                              key={item.id}
                              className="bg-luxury-gray/20 border border-gray-800/80 rounded-lg p-3.5 flex justify-between items-center text-xs"
                            >
                              <div className="min-w-0 pr-4">
                                <span className="text-[9px] bg-gold-950 text-gold-400 px-1 py-0.2 rounded">
                                  {item.badge}
                                </span>
                                <h4 className="font-bold text-white mt-1.5">{item.title}</h4>
                                <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.description}</p>
                              </div>

                              <button
                                onClick={() => startEditBenefit(item)}
                                className="p-2 text-gray-400 hover:text-gold-450 hover:bg-luxury-gray rounded cursor-pointer"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
