import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="glassmorphic h-full flex flex-col">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4 justify-center">
        <Button size="lg" className="w-full">
          <Plus className="mr-2" />
          New Meeting
        </Button>
        <Button size="lg" variant="secondary" className="w-full">
          <Bot className="mr-2" />
          Generate MoM
        </Button>
      </CardContent>
    </Card>
  );
}
