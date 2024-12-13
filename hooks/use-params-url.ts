"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IParamValue } from "@/app/projects/[project]/model";

type ParamKeys = "timeRange" | "category" | "viewType" | "includeCIDownloads" | "granularity" | "versions";


export function useParamsUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: ParamKeys, defaultValue: string) => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const getParamValue = useCallback(<T extends IParamValue>(
    key: ParamKeys,
    paramClass: { fromKey(key: string): T },
    defaultValue: T
  ): T => {
    const param = searchParams.get(key);
    return param
      ? paramClass.fromKey(param)
      : defaultValue;
  }, [searchParams]);

  const getListParam = useCallback((key: ParamKeys, defaultValue: string[]) => {
    return searchParams.get(key)?.split(",") || defaultValue;
  }, [searchParams]);

  const updateUrl = useCallback((key: ParamKeys, value: string | string[] | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    } else {
      params.set(key, String(value));
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";
    window.history.replaceState(null, "", newUrl);
  }, [router, searchParams]);

  return {
    getParam,
    getParamValue,
    getListParam,
    updateUrl,
    searchParams
  };
}