"use client";

import { useNewsBanner } from "@/hooks/use-news-banner";
import { NewsLink } from "./news-link";
import { CloseButton } from "./close-button";

export function NewsBanner() {
  const { isVisible, closeBanner, news } = useNewsBanner();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-medium">
            {news.title}
            {" "}
            {news.description}
          </span>

          {news.link && (
            <NewsLink
              text={news.link.text}
              url={news.link.url}
            />
          )}
          <CloseButton onClick={closeBanner} />

        </div>
      </div>
    </div>
  );
}