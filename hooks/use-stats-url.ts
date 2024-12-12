"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IParamValue } from "@/app/projects/[project]/model";

export function useStatsUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: string, defaultValue: string) => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const getParamValue = useCallback(<T extends IParamValue>(
    key: string,
    paramClass: { fromKey(key: string): T },
    defaultValue: T
  ): T => {
    const param = searchParams.get(key);
    return param
      ? paramClass.fromKey(param)
      : defaultValue;
  }, [searchParams]);

  const getListParam = useCallback((key: string, defaultValue: string[]) => {
    return searchParams.get(key)?.split(",") || defaultValue;
  }, [searchParams]);

  const updateUrl = useCallback((updates: Record<string, string | boolean | string[]>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        } else {
          params.delete(key);
        }
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  return {
    getParam,
    getParamValue,
    getListParam,
    updateUrl
  };
}