"use client";

export interface NewsItem {
  title: string;
  description: string;
}

export interface CreateMonthlyNewsBody {
  reportDate: string;
  introduction: string;
  news: NewsItem[];
}

export interface MonthlyNews {
  id?: string;
  creationDate?: string;
  reportDate: string;
  introduction: string;
  news: NewsItem[];
}

export async function getMonthlyNews(): Promise<MonthlyNews[]> {
  const response = await fetch("/api/admin/v1/monthly-news");
  if (!response.ok) {
    throw new Error("Failed to fetch monthly news");
  }
  return response.json();
}

export async function getMonthlyNewsById(id: string): Promise<MonthlyNews> {
  const response = await fetch(`/api/admin/v1/monthly-news/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch monthly news");
  }
  return response.json();
}

export async function saveMonthlyNews(data: MonthlyNews): Promise<MonthlyNews> {
  const response = await fetch("/api/admin/v1/monthly-news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to save monthly news");
  }

  return response.json();
}

export async function updateMonthlyNews(id: string, data: MonthlyNews): Promise<MonthlyNews> {
  const response = await fetch(`/api/admin/v1/monthly-news/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update monthly news");
  }

  return response.json();
}

export async function deleteMonthlyNews(id: string): Promise<void> {
  const response = await fetch(`/api/admin/v1/monthly-news/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete monthly news");
  }
}