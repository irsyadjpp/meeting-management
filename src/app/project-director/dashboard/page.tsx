
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { UpcomingMeeting } from "@/components/dashboard/upcoming-meeting";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TeamCarousel } from "@/components/dashboard/team-carousel";
import { MeetingList } from "@/components/dashboard/meeting-list";

export default function DirectorDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Director Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your meeting overview.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-2 xl:col-span-3">
            <UpcomingMeeting />
          </div>
          <div className="lg:col-span-1 xl:col-span-1 row-span-2">
             <QuickActions />
          </div>
          <div className="lg:col-span-2 xl:col-span-3">
            <MeetingList />
          </div>
          <div className="lg:col-span-3 xl:col-span-4">
             <TeamCarousel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
