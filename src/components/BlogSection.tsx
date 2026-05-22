/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BlogArticle } from "../types";
import { Eye, Clock, ChevronRight, BookOpen, Send, Calendar, Award } from "lucide-react";

interface BlogSectionProps {
  blogs: BlogArticle[];
  onConsultClick: () => void;
}

export default function BlogSection({ blogs, onConsultClick }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(null);

  const categories = ["ALL", "다낭 카지노 후기", "다낭 카지노 혜택", "다낭 골프 여행", "다낭 밤문화 추천"];

  const filteredBlogs = selectedCategory === "ALL" 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  const handleReadArticle = (blog: BlogArticle) => {
    setReadingArticle(blog);
    
    // Increment local views count purely visually
    blog.views += 1;
  };

  return (
    <div className="space-y-10" id="seo-insights-container">
      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-white/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setReadingArticle(null);
            }}
            className={`px-4 py-2.5 text-[11px] font-semibold tracking-wider transition-all rounded-none border cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                : "bg-transparent border-white/5 text-white/55 hover:text-white hover:border-white/20 hover:bg-[#D4AF37]/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Articles Feed */}
        <div className={`space-y-6 ${readingArticle ? "lg:col-span-5" : "lg:col-span-12"}`}>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-xs tracking-widest font-mono">
              선택한 카테고리에 게시글이 없습니다.
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-4 ${readingArticle ? "grid-cols-1" : "md:grid-cols-2"}`}>
              {filteredBlogs.map((blog) => {
                const isSelected = readingArticle?.id === blog.id;
                return (
                  <div
                    key={blog.id}
                    onClick={() => handleReadArticle(blog)}
                    className={`bg-[#0c0c0c] border p-5 rounded-none hover:border-[#D4AF37]/35 transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/15" : "border-white/10"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[10px] text-white/40 mb-3">
                        <span className="text-[#D4AF37] font-bold bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-none tracking-widest text-[9px]">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {blog.views}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-display font-medium text-sm text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-relaxed uppercase tracking-wider">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-white/50 mt-2 line-clamp-3 leading-relaxed font-sans">
                        {blog.snippet}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#D4AF37] font-bold tracking-widest group-hover:text-white transition-colors">
                      <span>전문 칼럼 비주얼 읽기</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Active Reader Panel */}
        {readingArticle && (
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-none p-6 md:p-8 space-y-6 animate-fade-in relative shadow-2xl">
            {/* Ambient luxury accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full filter blur-xl pointer-events-none" />

            {/* Read Close trigger */}
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-4 right-4 text-xs text-white/50 hover:text-white border border-white/10 hover:border-[#D4AF37]/30 px-3 py-1 rounded-none cursor-pointer duration-300 font-mono text-[10px] tracking-wider"
            >
              닫기
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-[10px] text-white/40">
                <span className="text-[#D4AF37] font-bold bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-none tracking-widest uppercase">
                  {readingArticle.category}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {readingArticle.date}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {readingArticle.views} 읽음
                </span>
              </div>

              <h3 className="font-display text-lg md:text-xl font-medium text-white tracking-widest leading-relaxed uppercase">
                {readingArticle.title}
              </h3>

              <div className="border-b border-white/10 pb-4" />
            </div>

            {/* Main content body */}
            <div className="text-sm text-white/80 leading-relaxed font-sans space-y-4 whitespace-pre-line bg-[#050505] border border-white/5 p-5 rounded-none max-h-[450px] overflow-y-auto">
              {readingArticle.content}
            </div>

            {/* Premium Guide Notice & Call action */}
            <div className="p-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-none space-y-4">
              <div className="flex gap-2 items-center text-xs font-bold text-[#D4AF37] tracking-wider">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>공개되지 않는 명품 VVIP 코스 상담 안내</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-sans">
                다낭 현지의 롤링 요율 조정, 에스코트들의 디테일한 라인업, 골프 부킹 대행 콤프 혜택은 비밀 소통 보안 라인을 통해 1:1로만 전송해 드립니다.
              </p>
              <button
                onClick={onConsultClick}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-black font-extrabold text-[11px] tracking-[0.2em] rounded-none transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 fill-current text-black stroke-[2.5]" />
                이 글의 상세 맞춤 일정 상담받기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
