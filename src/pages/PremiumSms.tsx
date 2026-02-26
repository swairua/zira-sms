import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { premiumServices } from "@/data/dummy-data";
import { DollarSign, Users, TrendingUp, MoreHorizontal } from "lucide-react";

const statusColor: Record<string, string> = {
  Active: "bg-success text-success-foreground",
  Suspended: "bg-destructive text-destructive-foreground",
  Pending: "bg-warning text-warning-foreground",
};

const summaryCards = [
  { title: "Total Revenue", value: "$48,600", icon: DollarSign },
  { title: "Total Subscriptions", value: "106,000", icon: Users },
  { title: "Active Services", value: "3", icon: TrendingUp },
];

export default function PremiumSms() {
  return (
    <AppLayout title="Premium SMS">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((c) => (
          <Card key={c.title}>
            <CardContent className="p-4 flex items-center gap-3">
              <c.icon className="h-8 w-8 text-primary opacity-70" />
              <div>
                <p className="text-xs text-muted-foreground">{c.title}</p>
                <p className="text-xl font-bold">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Shortcode</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Tariff</TableHead>
                <TableHead className="text-right">Subscriptions</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {premiumServices.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.serviceName}</TableCell>
                  <TableCell className="font-mono">{s.shortcode}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{s.keyword}</Badge></TableCell>
                  <TableCell>{s.tariff}</TableCell>
                  <TableCell className="text-right">{s.subscriptions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{s.revenue}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColor[s.status]}`}>{s.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
