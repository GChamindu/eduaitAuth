"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { subscriptionPlans, formatPrice } from "@/lib/subscription"

export default function PricingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"
  const { data: session, status } = useSession()

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const currentPlan = session?.user?.subscriptionPlan || "free"

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlan) return
    setSelectedPlan(planId)
  }

  const handleSubscribe = async () => {
    if (!selectedPlan || !session?.user) return

    setIsProcessing(true)

    try {
      // In a real app, this would be an API call to update the subscription
      // For this demo, we'll simulate success and redirect

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the callback URL or home page
      router.push(callbackUrl)
    } catch (error) {
      console.error("Subscription error:", error)
      setIsProcessing(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="container py-12 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your educational needs. Upgrade anytime to access more features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""} ${
              selectedPlan === plan.id ? "ring-2 ring-primary" : ""
            } ${currentPlan === plan.id ? "bg-muted/50" : ""}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-tl-none rounded-br-none bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                {plan.duration && plan.price > 0 && (
                  <span className="text-muted-foreground text-sm ml-1">/{plan.duration}</span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}

                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                disabled={currentPlan === plan.id || isProcessing}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {currentPlan === plan.id ? "Current Plan" : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleSubscribe} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Confirm Subscription"}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            You can cancel your subscription at any time from your account settings.
          </p>
        </div>
      )}
    </div>
  )
}

