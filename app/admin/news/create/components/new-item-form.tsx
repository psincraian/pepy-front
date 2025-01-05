import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
}

interface NewsItemFormProps {
  item: NewsItem;
  onUpdate: (id: string, field: "title" | "description", value: string) => void;
  onRemove: (id: string) => void;
}

export function NewsItemForm({ item, onUpdate, onRemove }: NewsItemFormProps) {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>
            <Input
              value={item.title}
              onChange={(e) => onUpdate(item.id, "title", e.target.value)}
              placeholder="News title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              value={item.description}
              onChange={(e) => onUpdate(item.id, "description", e.target.value)}
              placeholder="News description"
              rows={3}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}