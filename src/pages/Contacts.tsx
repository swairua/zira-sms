import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactGroups, contacts } from "@/data/dummy-data";
import { Users, Plus, Upload, ArrowLeft } from "lucide-react";

export default function Contacts() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const groupContacts = selectedGroup ? contacts.filter((c) => c.groupId === selectedGroup) : [];
  const group = contactGroups.find((g) => g.id === selectedGroup);

  return (
    <AppLayout title="Contacts & Groups">
      {!selectedGroup ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{contactGroups.length} groups</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Upload CSV</Button>
              <Dialog>
                <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Create Group</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Create New Group</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div><Label>Group Name</Label><Input placeholder="e.g. Marketing List" /></div>
                    <div><Label>Description</Label><Input placeholder="Brief description" /></div>
                    <Button className="w-full">Create Group</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactGroups.map((g) => (
              <Card key={g.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedGroup(g.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">{g.name}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{g.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{g.contactCount.toLocaleString()} contacts</span>
                    <span className="text-muted-foreground">Last: {g.lastUsed}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedGroup(null)}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            <h2 className="font-semibold">{group?.name}</h2>
            <Badge variant="secondary">{groupContacts.length} contacts</Badge>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupContacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground">{c.phone}</TableCell>
                      <TableCell>{c.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs mr-1">{t}</Badge>)}</TableCell>
                      <TableCell>
                        <Badge className={c.status === "Active" ? "bg-success text-success-foreground text-xs" : "bg-muted text-muted-foreground text-xs"}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{c.dateAdded}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </AppLayout>
  );
}
