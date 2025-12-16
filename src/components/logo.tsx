import { FileText } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="p-2 bg-primary rounded-lg">
        <FileText className="text-primary-foreground h-6 w-6" />
      </div>
      <h2 className="text-xl font-bold tracking-tighter text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        BCC Meetings
      </h2>
    </div>
  );
}
