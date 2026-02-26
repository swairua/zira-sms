import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { MessageSquare, TrendingUp, Zap, DollarSign, Radio, Plus, Upload, Send, Loader2 } from "lucide-react";
import { useDashboardData, useCampaigns } from "@/hooks/useData";

const statusColor: Record<string, string> = {
  Completed: "bg-success text-success-foreground",
  Running: "bg-primary text-primary-foreground",
  Scheduled: "bg-warning text-warning-foreground",
  Draft: "bg-muted text-muted-foreground",
  Paused: "bg-destructive/80 text-destructive-foreground",
};

export default function Dashboard() {
  const { kpis, messagesOverTime, messageTypeBreakdown, loading: dashboardLoading } = useDashboardData();
  const { data: campaigns, loading: campaignsLoading } = useCampaigns();

  const kpiCards = [
    { title: "Total Messages Sent", value: kpis.totalMessagesSent, icon: MessageSquare, color: "text-primary" },
    { title: "Delivery Rate", value: kpis.deliveryRate, icon: TrendingUp, color: "text-success" },
    { title: "Active Campaigns", value: kpis.activeCampaigns, icon: Zap, color: "text-warning" },
    { title: "Revenue This Month", value: kpis.revenueThisMonth, icon: DollarSign, color: "text-success" },
    { title: "Active Sender IDs", value: kpis.activeSenderIds, icon: Radio, color: "text-primary" },
  ];

  const recentCampaigns = campaigns.slice(0, 6);

  if (dashboardLoading || campaignsLoading) {
    return (
      <AppLayout title="Dashboard">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Messages Over Last 30 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={messagesOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Line type="monotone" dataKey="sent" stroke="hsl(215, 70%, 45%)" strokeWidth={2} dot={false} name="Sent" />
                <Line type="monotone" dataKey="delivered" stroke="hsl(142, 72%, 29%)" strokeWidth={2} dot={false} name="Delivered" />
                <Line type="monotone" dataKey="failed" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={false} name="Failed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Messages by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={messageTypeBreakdown} cx="50%" cy="45%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {messageTypeBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Recent Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
          <Button className="w-full justify-start gap-2" size="sm"><Plus className="h-4 w-4" /> New Campaign</Button>
          <Button className="w-full justify-start gap-2" variant="outline" size="sm"><Upload className="h-4 w-4" /> Upload Contacts</Button>
          <Button className="w-full justify-start gap-2" variant="outline" size="sm"><Send className="h-4 w-4" /> Request Sender ID</Button>
        </div>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Sent</TableHead>
                  <TableHead className="text-right">Delivered</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCampaigns.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{c.type}</Badge></TableCell>
                    <TableCell><Badge className={`text-xs ${statusColor[c.status]}`}>{c.status}</Badge></TableCell>
                    <TableCell className="text-right">{c.sent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{c.delivered.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{c.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
