import React from "react";
import { Mail } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { PieChart } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SubscribeForm } from "@/components/subscribe-form";

const Newsletter = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Mail className="h-12 w-12 mx-auto mb-6 text-blue-600" />
          <h1 className="text-4xl font-bold mb-4">Stay Updated</h1>
          <p className="text-xl text-muted-foreground">
            Get weekly insights about the most popular Python packages and trends in the ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div
              className="bg-blue-50 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Monthly Comparisons</h3>
            <p className="text-muted-foreground">
              Track download trends and compare package performance month over month.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div
              className="bg-blue-50 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Statistics</h3>
            <p className="text-muted-foreground">
              Deep dive into package usage patterns and adoption rates across versions.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div
              className="bg-blue-50 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Detailed Charts</h3>
            <p className="text-muted-foreground">
              Visualize package statistics with interactive and detailed charts.
            </p>
          </Card>
        </div>

        {/* Subscription Card */}
        <SubscribeForm />
      </div>
    </div>
  );
};

export default Newsletter;
