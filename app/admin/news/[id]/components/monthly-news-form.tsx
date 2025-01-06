"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { NewsItemForm } from "./news-item-form";
import { type MonthlyNews, type NewsItem } from "@/lib/api/monthly-news";
import { useToast } from "@/hooks/use-toast";

interface MonthlyNewsFormProps {
  onSubmit: (data: MonthlyNews) => Promise<void>;
  initialData?: MonthlyNews;
}

export function MonthlyNewsForm({ onSubmit, initialData }: MonthlyNewsFormProps) {
  const [reportDate, setReportDate] = useState(initialData?.reportDate || new Date().toISOString().split("T")[0]);
  const [introduction, setIntroduction] = useState(initialData?.introduction || "");
  const [news, setNews] = useState<NewsItem[]>(initialData?.news || []);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addNewsItem = () => {
    setNews([...news, { title: "", content: "" }]);
  };

  const removeNewsItem = (index: number) => {
    setNews(news.filter((_, i) => i !== index));
  };

  const updateNewsItem = (index: number, field: keyof NewsItem, value: string) => {
    setNews(news.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data: MonthlyNews = {
        reportDate: reportDate + "-01",
        introduction,
        news
      };

      await onSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save monthly news",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Report Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Report Date
            </label>
            <Input
              type="month"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Welcome Message
            </label>
            <Textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="Enter welcome message"
              className="max-w-2xl"
              rows={4}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">News Items</h2>
          <Button onClick={addNewsItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add News Item
          </Button>
        </div>
        <div className="space-y-6">
          {news.map((item, index) => (
            <NewsItemForm
              key={index}
              item={item}
              onUpdate={(field, value) => updateNewsItem(index, field, value)}
              onRemove={() => removeNewsItem(index)}
            />
          ))}
          {news.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No news items added. Click &quot;Add News Item&quot; to create one.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}