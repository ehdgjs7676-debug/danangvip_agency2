/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CasinoBenefit {
  id: string;
  title: string;
  description: string;
  detail: string;
  badge?: string;
  iconName: string;
}

export interface GolfVillaPlace {
  id: string;
  name: string;
  englishName: string;
  description: string;
  imageUrl: string;
  tags: string[];
  features: string[];
  locationDetails: string;
}

export interface NightExperience {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  imageUrl: string;
  details: string[];
  vibeBadge: string;
}

export interface PortfolioExperience {
  id: string;
  title: string;
  description: string;
  clientType: string; // e.g., "하이롤러 멤버십", "싱글 골퍼 & 밤문화", "VVIP 그룹"
  rating: number;
  imageUrl: string;
  duration: string; // e.g., "3박 4일"
  highlights: string[];
  testimonial?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  date: string;
  views: number;
}

export interface CounselRequest {
  id: string;
  name: string;
  phoneNumber: string;
  messengerType: "kakaotalk" | "telegram" | "phone";
  messengerId: string;
  preferredDate: string;
  selectedCategories: string[]; // "casino", "golf", "villa", "night", "care"
  status: "pending" | "contacted" | "completed";
  createdAt: string;
  notes?: string;
}
