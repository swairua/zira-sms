import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tenants } from "@/data/dummy-data";
import { MoreHorizontal, Plus } from "lucide-react";

const planColor: Record<string, string> = {
  Starter: "bg-muted text-muted-foreground",
  Business: "bg-primary text-primary-foreground",
  Enterprise: "bg-success text-success-foreground",
};

const statusColor: Record<string, string> = {
  Active: "bg-success text-success-foreground",
  Suspended: "bg-destructive text-destructive-foreground",
  Trial: "bg-warning text-warning-foreground",
};

export default function AdminTenants() {
  return (
    <AppLayout title="Tenant Management">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{tenants.length} tenants registered</p>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Add Tenant</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">SMS Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.company}</TableCell>
                  <TableCell className="text-muted-foreground">{t.contactPerson}</TableCell>
                  <TableCell><Badge className={`text-xs ${planColor[t.plan]}`}>{t.plan}</Badge></TableCell>
                  <TableCell className="text-right">{t.smsBalance.toLocaleString()}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColor[t.status]}`}>{t.status}</Badge></TableCell>
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
