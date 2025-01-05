"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/app/admin/news/components/page-header";
import { MonthlyNewsList } from "@/app/admin/news/components/monthly-news-list";

export default function NewsAdminPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Monthly News Reports"
        description="Manage and create monthly news reports for subscribers"
        action={
          <Button
            onClick={() => router.push("/admin/news/create")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Report
          </Button>
        }
      />
      <MonthlyNewsList />
    </div>
  );
}