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
import { Calendar, Clock, ChevronUp, Mail, PencilLine } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ProfilePage() {
  const { isAuthenticated, user } = useKindeBrowserClient();
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-screen-xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 space-y-6">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                {isAuthenticated && user?.picture ? (
                  <AvatarImage src={user.picture} />
                ) : (
                  <AvatarImage src="/avatars/01.png" />
                )}
                <AvatarFallback className="bg-primary/10 text-2xl font-medium uppercase">
                  {user?.given_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {user?.given_name || "Anonymous"}{" "}
                </h2>
                <p className="text-muted-foreground flex items-center justify-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user?.email || "email id"}
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
          {/* <div className="text-center text-xs text-muted-foreground pt-2"> */}
          {/*   Made with ❣️ v0.0.1 */}
          {/* </div> */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Peterson"
                  className="bg-background"
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
                defaultValue="john@example.com"
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
