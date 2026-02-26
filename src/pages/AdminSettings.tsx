import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
  return (
    <AppLayout title="Platform Settings">
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle className="text-base">General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Platform Name</Label>
              <Input defaultValue="BulkSMS Pro" />
            </div>
            <div className="space-y-1.5">
              <Label>Support Email</Label>
              <Input defaultValue="support@bulksmspro.io" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Features</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Premium SMS</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Enable Shortcodes</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Maintenance Mode</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>
        <Button className="w-fit">Save Changes</Button>
      </div>
    </AppLayout>
  );
}
