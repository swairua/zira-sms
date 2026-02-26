import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { senderIds } from "@/data/dummy-data";
import { Plus, MoreHorizontal } from "lucide-react";

const statusColor: Record<string, string> = {
  Approved: "bg-success text-success-foreground",
  Pending: "bg-warning text-warning-foreground",
  Rejected: "bg-destructive text-destructive-foreground",
};

function SenderTable({ type }: { type: "Promotional" | "Transactional" }) {
  const filtered = senderIds.filter((s) => s.type === type);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sender ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Registered</TableHead>
          <TableHead>Expiry</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="font-semibold">{s.name}</TableCell>
            <TableCell><Badge variant="secondary" className="text-xs">{s.type}</Badge></TableCell>
            <TableCell><Badge className={`text-xs ${statusColor[s.status]}`}>{s.status}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-xs">{s.registeredDate}</TableCell>
            <TableCell className="text-muted-foreground text-xs">{s.expiry}</TableCell>
            <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function SenderIds() {
  return (
    <AppLayout title="Sender ID Management">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{senderIds.length} sender IDs registered</p>
        <Dialog>
          <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Request Sender ID</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Request New Sender ID</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Sender ID Name</Label><Input placeholder="e.g. MYBRAND (max 11 chars)" maxLength={11} /></div>
              <div><Label>Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent><SelectItem value="promo">Promotional</SelectItem><SelectItem value="trans">Transactional</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Purpose</Label><Input placeholder="Describe intended use" /></div>
              <Button className="w-full">Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0 pt-4">
          <Tabs defaultValue="promotional" className="px-4">
            <TabsList>
              <TabsTrigger value="promotional">Promotional</TabsTrigger>
              <TabsTrigger value="transactional">Transactional</TabsTrigger>
            </TabsList>
            <TabsContent value="promotional"><SenderTable type="Promotional" /></TabsContent>
            <TabsContent value="transactional"><SenderTable type="Transactional" /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
