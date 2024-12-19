"use client";

import { useEffect, useState } from "react";
import { NEWS } from "@/lib/constants/news";

export function useNewsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const news = NEWS.CHRISTMAS_GIVEWAY_2024;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = new Date().getTime();
    const expiryDate = new Date(news.expiryDate).getTime();
    const storageKey = `news-banner-closed-${news.id}`; // Unique key for each news
    const isClosed = localStorage.getItem(storageKey) === "true";
    const isExpired = now > expiryDate;

    setIsVisible(!isClosed && !isExpired);
  }, [news.expiryDate, news.id]);

  const closeBanner = () => {
    const storageKey = `news-banner-closed-${news.id}`; // Use the same unique key
    localStorage.setItem(storageKey, "true");
    setIsVisible(false);
  };

  return {
    isVisible,
    closeBanner,
    news,
  };
}