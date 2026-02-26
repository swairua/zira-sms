import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shortcodes } from "@/data/dummy-data";
import { Plus, MoreHorizontal } from "lucide-react";

const statusColor: Record<string, string> = {
  Active: "bg-success text-success-foreground",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-warning text-warning-foreground",
};

export default function Shortcodes() {
  return (
    <AppLayout title="Shortcodes">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{shortcodes.length} shortcodes</p>
        <Dialog>
          <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Register Shortcode</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Register New Shortcode</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Shortcode Number</Label><Input placeholder="e.g. 20500" /></div>
              <div><Label>Keyword</Label><Input placeholder="e.g. VOTE" /></div>
              <div><Label>Service Description</Label><Input placeholder="Describe the service" /></div>
              <Button className="w-full">Submit Registration</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shortcode</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Monthly Volume</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcodes.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-semibold font-mono">{s.code}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{s.keyword}</Badge></TableCell>
                  <TableCell>{s.service}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColor[s.status]}`}>{s.status}</Badge></TableCell>
                  <TableCell className="text-right">{s.monthlyVolume.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{s.revenue}</TableCell>
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
