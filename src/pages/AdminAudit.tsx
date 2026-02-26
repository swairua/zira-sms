import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { auditLog } from "@/data/dummy-data";

export default function AdminAudit() {
  return (
    <AppLayout title="Audit Log">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {auditLog.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{entry.action}</span>
                    <span className="text-xs text-muted-foreground">by {entry.user}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.details}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
