"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { saveMonthlyNews } from "@/lib/api/monthly-news";
import { CreateMonthlyNewsBody } from "@/lib/api/monthly-news";
import React from "react";
import { PageHeader } from "@/app/admin/news/components/page-header";
import { EmailTemplateForm } from "@/app/admin/news/create/components/email-template-form";

export default function CreateNewsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateMonthlyNewsBody) => {
    try {
      await saveMonthlyNews(data);
      toast({
        title: "Success",
        description: "Monthly news report created successfully"
      });
      router.push("/admin/news");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create monthly news report",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Create Monthly News Report"
        description="Create a new monthly news report for subscribers"
      />
      <EmailTemplateForm onSave={handleSubmit} />
    </div>
  );
}