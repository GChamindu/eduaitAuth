"use client"

import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { getRemainingDays } from "@/lib/subscription"
import { Clock } from "lucide-react"

export default function SubscriptionStatus() {
  const { data: session, status } = useSession()

  if (status === "loading" || !session?.user) {
    return null
  }

  const plan = session.user.subscriptionPlan || "free"
  const endDate = session.user.subscriptionEndDate
  const remainingDays = getRemainingDays(endDate)

  const getPlanColor = () => {
    switch (plan) {
      case "premium":
      case "annual":
        return "bg-amber-500 hover:bg-amber-600"
      case "basic":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${getPlanColor()} text-white`}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</Badge>
      {plan !== "free" && remainingDays > 0 && (
        <span className="text-xs flex items-center gap-1 text-muted-foreground">
          <Clock size={12} />
          {remainingDays} days left
        </span>
      )}
    </div>
  )
}

