"use client";

import { useEffect, useState } from "react";
import { NEWS } from "@/lib/constants/news";

const STORAGE_KEY = "news-banner-closed";

export function useNewsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const news = NEWS.CHRISTMAS_GIVEWAY_2024;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = new Date().getTime();
    const expiryDate = new Date(news.expiryDate).getTime();
    const isClosed = localStorage.getItem(STORAGE_KEY) === "true";
    const isExpired = now > expiryDate;

    setIsVisible(!isClosed && !isExpired);
  }, [news.expiryDate]);

  const closeBanner = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  return {
    isVisible,
    closeBanner,
    news
  };
}