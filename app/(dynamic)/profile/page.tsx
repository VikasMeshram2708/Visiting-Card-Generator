"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ChevronUp,
  Mail,
  PencilLine,
  Loader2,
} from "lucide-react";
import { getSession, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-screen-xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 space-y-6">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                <AvatarImage src={data?.user?.image || "/avatars/01.png"} />
                <AvatarFallback className="bg-primary/10 text-2xl font-medium uppercase">
                  {data?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {data?.user?.name || "Anonymous"}
                </h2>
                <p className="text-muted-foreground flex items-center justify-center gap-1">
                  <Mail className="h-4 w-4" />
                  {data?.user?.email || "email not available"}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                Pro Plan
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member since
                </span>
                <span className="font-medium">Jan 2023</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last active
                </span>
                <span className="font-medium">2 hours ago</span>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <ChevronUp className="h-4 w-4" />
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PencilLine className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Profile Settings</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="">
              <div className="space-y-2">
                <Label htmlFor="firstName">Name</Label>
                <Input
                  id="firstName"
                  defaultValue={data?.user?.name || ""}
                  className="bg-background w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                readOnly
                id="email"
                type="email"
                defaultValue={data?.user?.email || ""}
                className="bg-background cursor-not-allowed"
                onFocus={(e) => e.target.blur()}
                tabIndex={-1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">About</Label>
              <Textarea
                id="bio"
                defaultValue="Driving innovation through user-centered design and strategic thinking."
                className="min-h-[120px] bg-background"
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button className="px-6">Save Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
