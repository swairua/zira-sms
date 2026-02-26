import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminUsers } from "@/data/dummy-data";

export default function AdminUsers() {
  return (
    <AppLayout title="User Management">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{u.role}</Badge></TableCell>
                  <TableCell>
                    <Badge className={u.status === "Active" ? "bg-success text-success-foreground text-xs" : "bg-muted text-muted-foreground text-xs"}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{u.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
