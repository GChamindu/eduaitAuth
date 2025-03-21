"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getRemainingDays } from "@/lib/subscription"
import { CalendarDays, CreditCard, LogOut, User, Clock } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("account")

  if (!session?.user) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Not Signed In</h1>
        <p className="mb-4">You need to sign in to view your profile.</p>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  const plan = session.user.subscriptionPlan || "free"
  const endDate = session.user.subscriptionEndDate
  const remainingDays = getRemainingDays(endDate)

  const getPlanDetails = () => {
    switch (plan) {
      case "premium":
        return {
          name: "Premium",
          price: "$19.99/month",
          color: "bg-amber-500",
        }
      case "basic":
        return {
          name: "Basic",
          price: "$9.99/month",
          color: "bg-blue-500",
        }
      case "annual":
        return {
          name: "Annual",
          price: "$199.99/year",
          color: "bg-amber-500",
        }
      default:
        return {
          name: "Free",
          price: "Free",
          color: "bg-gray-500",
        }
    }
  }

  const planDetails = getPlanDetails()

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <Avatar className="w-20 h-20">
            {session.user.image ? (
              <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
            ) : (
              <AvatarFallback className="text-lg">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{session.user.name}</h1>
            <p className="text-muted-foreground">{session.user.email}</p>

            <div className="flex items-center gap-3 mt-2">
              <Badge className={`${planDetails.color} text-white`}>{planDetails.name}</Badge>

              {plan !== "free" && (
                <span className="text-sm flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} />
                  {remainingDays} days remaining
                </span>
              )}
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => signOut()} className="flex items-center gap-1">
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="account" className="flex items-center gap-1">
              <User size={16} />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-1">
              <CreditCard size={16} />
              <span className="hidden md:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <CalendarDays size={16} />
              <span className="hidden md:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={session.user.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={session.user.email || ""} disabled />
                  <p className="text-xs text-muted-foreground">
                    Your email address is used for login and cannot be changed
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value="••••••••" disabled />
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Change password
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Manage your subscription plan and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Current Plan</h3>
                    <Badge className={`${planDetails.color} text-white`}>{planDetails.name}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {plan === "free"
                      ? "You are currently on the free plan with limited access."
                      : `Your subscription costs ${planDetails.price}.`}
                  </p>
                  {plan !== "free" && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={14} />
                      <span>Renews in {remainingDays} days</span>
                    </div>
                  )}
                </div>

                {plan === "free" ? (
                  <div className="text-center">
                    <p className="mb-4 text-sm">Upgrade to a paid plan to access all features and content.</p>
                    <Link href="/pricing">
                      <Button>View Plans</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="flex items-center gap-2 p-3 border rounded-md">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Billing History</h3>
                      <div className="border rounded-md divide-y">
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{planDetails.name} Subscription</p>
                            <p className="text-xs text-muted-foreground">Mar 15, 2023</p>
                          </div>
                          <span className="text-sm">{planDetails.price.split("/")[0]}</span>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{planDetails.name} Subscription</p>
                            <p className="text-xs text-muted-foreground">Feb 15, 2023</p>
                          </div>
                          <span className="text-sm">{planDetails.price.split("/")[0]}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                {plan !== "free" && (
                  <>
                    <Link href="/pricing">
                      <Button variant="outline">Change Plan</Button>
                    </Link>
                    <Button variant="link" className="text-destructive p-0 h-auto">
                      Cancel Subscription
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent activity and usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-1">AI Questions</h3>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground">
                        {plan === "free" ? "5 remaining today" : "Unlimited"}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-1">Forum Posts</h3>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-muted-foreground">2 replies received</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-1">Resources</h3>
                      <p className="text-2xl font-bold">7</p>
                      <p className="text-xs text-muted-foreground">
                        {plan === "free" ? "3 downloads remaining this month" : "Unlimited downloads"}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium mt-6 mb-2">Recent Activity</h3>
                  <div className="border rounded-md divide-y">
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">Downloaded "Physics Model Paper 2023"</p>
                          <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">Asked a question in the forum</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">Used AI Assistant for Chemistry help</p>
                          <p className="text-xs text-muted-foreground">Mar 20, 2023, 2:15 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

