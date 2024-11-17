import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <Card className="p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-6">
            Have questions or need help? Send us an email at:
          </p>
          <a
            href="mailto:help@pepy.tech"
            className="text-xl text-blue-600 hover:underline font-medium"
          >
            help@pepy.tech
          </a>
        </Card>
      </div>
    </div>
  );
}