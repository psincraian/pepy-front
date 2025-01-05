"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { NewsItemForm } from "@/app/admin/news/create/components/new-item-form";

interface NewsItem {
  id: string;
  title: string;
  description: string;
}

interface EmailTemplateFormProps {
  onSave: (data: {
    reportDate: string;
    title: string;
    introduction: string;
    news: NewsItem[];
  }) => void;
}

export function EmailTemplateForm({ onSave }: EmailTemplateFormProps) {
  var defaultDate = new Date();
  // adds 1 month to the current date
  var month = defaultDate.getMonth() + 2;
  var year = defaultDate.getFullYear();
  const [reportDate, setReportDate] = useState(`${year}-${month.toString().padStart(2, "0")}`);
  const [title, setTitle] = useState("📊 {{project}} - {{month}} Stats");
  const [introduction, setIntroduction] = useState("This month has been really amazing with plenty of new cool news ✨");
  const [news, setNews] = useState<NewsItem[]>([
    { id: "1", title: "New Feature Release", description: "We've added exciting new capabilities!" }
  ]);

  const addNewsItem = () => {
    const newId = (news.length + 1).toString();
    setNews([...news, { id: newId, title: "", description: "" }]);
  };

  const removeNewsItem = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  const updateNewsItem = (id: string, field: "title" | "description", value: string) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    onSave({ reportDate: reportDate + "-01", title, introduction, news });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Email Template Editor</h1>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Report date</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Report Date
            </label>
            <Input
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="max-w-xs"
              type="month"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Header</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter email title"
              className="max-w-2xl"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Available variables: {"{{project}}"}, {"{{month}}"}
            </p>
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
          {news.map((item) => (
            <NewsItemForm
              key={item.id}
              item={item}
              onUpdate={updateNewsItem}
              onRemove={removeNewsItem}
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