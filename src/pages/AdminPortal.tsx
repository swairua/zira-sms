import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { systemHealth } from "@/data/dummy-data";
import { Activity, Gauge, Zap, Clock } from "lucide-react";

const healthCards = [
  { title: "API Uptime", value: systemHealth.apiUptime, icon: Activity },
  { title: "Queue Depth", value: systemHealth.queueDepth.toLocaleString(), icon: Gauge },
  { title: "Throughput", value: systemHealth.throughput, icon: Zap },
  { title: "Avg Latency", value: systemHealth.avgLatency, icon: Clock },
];

export default function AdminPortal() {
  return (
    <AppLayout title="System Overview">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthCards.map((h) => (
          <Card key={h.title}>
            <CardContent className="p-4 flex items-center gap-3">
              <h.icon className="h-6 w-6 text-primary opacity-70" />
              <div>
                <p className="text-xs text-muted-foreground">{h.title}</p>
                <p className="text-lg font-bold">{h.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">System overview dashboard — expand with real-time metrics, alerts, and platform usage charts.</p>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
