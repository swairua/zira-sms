import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showKey, setShowKey] = useState(false);

  // PUBLIC KEY ONLY (SAFE)
  const LIVE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

  const maskedKey =
    LIVE_KEY.length > 4
      ? LIVE_KEY.replace(/.(?=.{4})/g, "•")
      : "";

  return (
    <AppLayout title="Settings">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="Alex Mutiso" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="alex@bulksms.co.ke" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+254 712 345 678" />
              </div>
              <div>
                <Label>Company</Label>
                <Input defaultValue="BulkSMS Pro Ltd" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API KEYS */}
        <TabsContent value="api">
          <Card>
            <CardContent className="p-6 space-y-4 max-w-lg">

              <div>
                <Label>Publishable API Key</Label>

                <div className="flex gap-2 mt-1">
                  <Input
                    value={showKey ? LIVE_KEY : maskedKey}
                    readOnly
                    className="font-mono text-sm"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigator.clipboard.writeText(LIVE_KEY)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline">
                Manage API Keys (Backend)
              </Button>

            </CardContent>
          </Card>
        </TabsContent>

        {/* BILLING */}
        <TabsContent value="billing">
          <Card>
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div className="flex items-center justify-between p-3 rounded-md bg-muted">
                <div>
                  <p className="font-medium">Enterprise Plan</p>
                  <p className="text-sm text-muted-foreground">
                    $499/month • Unlimited SMS
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Active
                </Badge>
              </div>

              <div>
                <Label>SMS Balance</Label>
                <p className="text-2xl font-bold">5,000,000</p>
              </div>

              <div>
                <Label>Billing Email</Label>
                <Input defaultValue="billing@bulksms.co.ke" />
              </div>

              <Button variant="outline">Manage Subscription</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6 space-y-4 max-w-lg">
              {[
                "Campaign completed",
                "Low SMS balance",
                "Sender ID status change",
                "New user sign-up",
                "Weekly report",
              ].map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{n}</span>
                  <Switch defaultChecked={n !== "Weekly report"} />
                </div>
              ))}
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WEBHOOKS */}
        <TabsContent value="webhooks">
          <Card>
            <CardContent className="p-6 space-y-4 max-w-lg">
              <div>
                <Label>Delivery Report URL</Label>
                <Input defaultValue="https://api.yourapp.com/webhooks/delivery" />
              </div>

              <div>
                <Label>Inbound SMS URL</Label>
                <Input defaultValue="https://api.yourapp.com/webhooks/inbound" />
              </div>

              <div>
                <Label>Subscription Event URL</Label>
                <Input placeholder="https://..." />
              </div>

              <Button>Save Webhook Config</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </AppLayout>
  );
}
