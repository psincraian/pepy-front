"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMonthlyNews, type MonthlyNews } from "@/lib/api/monthly-news";
import { useToast } from "@/hooks/use-toast";

export function MonthlyNewsList() {
  const [reports, setReports] = useState<MonthlyNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const data = await getMonthlyNews();
      setReports(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid gap-4 mt-6">
        {reports.map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Report for {(new Date(report.reportDate)).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric"
                })}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {report.news.length} news items
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/news/${report.id}`)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No reports found. Create your first monthly news report.
          </div>
        )}
      </div>
    </>
  );
}