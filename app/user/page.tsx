"use client";

import { ApiKeys } from "@/app/user/components/api-keys";
import { Subscriptions } from "@/app/user/components/subscriptions";
import { ProjectSubscriptions } from "@/app/user/components/project-subscriptions";
import { ProfileHeader } from "@/app/user/components/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useUser } from "@/app/user/UserContext";

export default function ProfilePage() {
  const { user } = useUser();

  if (user === null) {
    return <>Loading...</>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader user={user} />

        <Tabs defaultValue="api-keys" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <Card className="p-6">
              <ApiKeys />
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card className="p-6">
              <Subscriptions isPro={user.isPro} />
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-6">
              <ProjectSubscriptions />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}