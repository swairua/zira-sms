import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { campaigns } from "@/data/dummy-data";
import { Plus, Filter, MoreHorizontal } from "lucide-react";

const statusColor: Record<string, string> = {
  Completed: "bg-success text-success-foreground",
  Running: "bg-primary text-primary-foreground",
  Scheduled: "bg-warning text-warning-foreground",
  Draft: "bg-muted text-muted-foreground",
  Paused: "bg-destructive/80 text-destructive-foreground",
};

export default function Campaigns() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [step, setStep] = useState(1);

  const filtered = campaigns.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (typeFilter !== "all" && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <AppLayout title="Campaigns">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Running">Running</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Promotional">Promotional</SelectItem>
              <SelectItem value="Transactional">Transactional</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Shortcode">Shortcode</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setStep(1)}><Plus className="h-4 w-4 mr-1" /> New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Campaign — Step {step} of 4</DialogTitle>
            </DialogHeader>
            {step === 1 && (
              <div className="space-y-3">
                <div><Label>Campaign Name</Label><Input placeholder="e.g. Summer Sale Blast" /></div>
                <div><Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent><SelectItem value="promo">Promotional</SelectItem><SelectItem value="trans">Transactional</SelectItem><SelectItem value="premium">Premium</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Sender ID</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select sender" /></SelectTrigger>
                    <SelectContent><SelectItem value="SHOPNOW">SHOPNOW</SelectItem><SelectItem value="DEALS">DEALS</SelectItem><SelectItem value="VERIFY">VERIFY</SelectItem></SelectContent>
                  </Select>
                </div>
                <Button onClick={() => setStep(2)} className="w-full">Next</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <div><Label>Message</Label><Textarea placeholder="Type your message..." rows={4} /></div>
                <p className="text-xs text-muted-foreground">0/160 characters • 1 SMS</p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1">Next</Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <div><Label>Recipients</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Subscribers (245,890)</SelectItem><SelectItem value="premium">Premium Customers (32,450)</SelectItem><SelectItem value="vip">VIP Clients (1,250)</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={() => setStep(4)} className="flex-1">Next</Button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-3">
                <Card><CardContent className="p-4 text-sm space-y-1">
                  <p><span className="text-muted-foreground">Campaign:</span> Summer Sale Blast</p>
                  <p><span className="text-muted-foreground">Type:</span> Promotional</p>
                  <p><span className="text-muted-foreground">Recipients:</span> 245,890</p>
                  <p><span className="text-muted-foreground">Schedule:</span> Send Now</p>
                </CardContent></Card>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                  <Button className="flex-1">Launch Campaign</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sender ID</TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Failed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{c.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{c.senderId}</TableCell>
                  <TableCell className="text-right">{c.recipients.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{c.sent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{c.delivered.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{c.failed.toLocaleString()}</TableCell>
                  <TableCell><Badge className={`text-xs ${statusColor[c.status]}`}>{c.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-xs">{c.createdDate}</TableCell>
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
