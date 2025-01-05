"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getMonthlyNewsById, updateMonthlyNews } from "@/lib/api/monthly-news";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageHeader } from "@/app/admin/news/components/page-header";
import { MonthlyNewsForm } from "@/app/admin/news/[id]/components/monthly-news-form";

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getMonthlyNewsById(params.id);
        setReport(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch report",
          variant: "destructive"
        });
        router.push("/admin/news");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [params.id, router, toast]);

  const handleSubmit = async (data: any) => {
    try {
      await updateMonthlyNews(params.id, data);
      toast({
        title: "Success",
        description: "Monthly news report updated successfully"
      });
      router.push("/admin/news");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update monthly news report",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Edit Monthly News Report"
        description="Update an existing monthly news report"
      />
      <MonthlyNewsForm onSubmit={handleSubmit} initialData={report} />
    </div>
  );
}