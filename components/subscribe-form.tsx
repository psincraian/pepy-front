"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubscribeButton } from "@/components/subscribe-button";

export function SubscribeForm() {
  const [project, setProject] = useState("");


  return (
    <Card className="p-8 max-w-xl mx-auto">
      <form className="space-y-4">
        <Input
          placeholder="The project you are intereste (e.g. pandas, requests, numpy)"
          type="text"
          className="h-12"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
        />
        <SubscribeButton project={project} className="w-full" />
        <p className="text-sm text-muted-foreground text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </Card>
  );
}

