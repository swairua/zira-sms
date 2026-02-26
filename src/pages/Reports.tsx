import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dailyDeliveryData, revenueOverTime } from "@/data/dummy-data";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout title="Reports & Analytics">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Feb 12 – Feb 25, 2026</span>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Delivery Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Delivered", value: "623,450", sub: "+5.2% vs last period" },
            { label: "Total Failed", value: "28,340", sub: "4.3% failure rate" },
            { label: "Avg. Daily Volume", value: "46,556", sub: "Across 14 days" },
            { label: "Peak Day", value: "Feb 20", sub: "52,340 messages" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delivery Chart */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Daily Delivery Report</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyDeliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="delivered" fill="hsl(215, 70%, 45%)" radius={[3, 3, 0, 0]} name="Delivered" />
                <Bar dataKey="failed" fill="hsl(0, 72%, 51%)" radius={[3, 3, 0, 0]} name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Revenue Trend (6 Months)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(142, 72%, 29%)" strokeWidth={2.5} dot={{ fill: "hsl(142, 72%, 29%)", r: 4 }} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
