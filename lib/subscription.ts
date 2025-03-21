// Subscription plans data
export const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to educational resources",
    price: 0,
    features: [
      "Access to limited model papers",
      "Basic AI assistance (5 questions/day)",
      "View forum posts (no posting)",
      "Download up to 3 resources/month",
    ],
    limitations: [
      "Limited access to model papers",
      "No access to premium content",
      "Limited forum participation",
      "Limited resource downloads",
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Enhanced access to educational content",
    price: 9.99,
    features: [
      "Full access to all model papers",
      "Enhanced AI assistance (20 questions/day)",
      "Full forum participation",
      "Download up to 20 resources/month",
      "Priority support",
    ],
    limitations: [],
    duration: "1 month",
    cta: "Get Started",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Complete access to all educational resources",
    price: 19.99,
    features: [
      "Full access to all model papers",
      "Unlimited AI assistance",
      "Full forum participation",
      "Unlimited resource downloads",
      "Priority support",
      "Exclusive study materials",
      "Personalized study plans",
    ],
    limitations: [],
    duration: "1 month",
    cta: "Get Premium",
    popular: true,
  },
  {
    id: "annual",
    name: "Annual",
    description: "Premium access with annual discount",
    price: 199.99,
    features: ["All Premium features", "2 months free (compared to monthly)", "Early access to new features"],
    limitations: [],
    duration: "1 year",
    cta: "Save with Annual",
    popular: false,
  },
]

// Check if a user has access to premium content
export function hasAccess(
  subscriptionPlan: string | undefined,
  subscriptionEndDate: Date | undefined,
  requiredPlan = "basic",
): boolean {
  // If no subscription plan is provided, assume no access
  if (!subscriptionPlan) return false

  // If the subscription is free, only allow access to free content
  if (subscriptionPlan === "free" && requiredPlan !== "free") return false

  // If the subscription is not free, check if it's still valid
  if (subscriptionPlan !== "free") {
    // If no end date is provided, assume no access
    if (!subscriptionEndDate) return false

    // Check if the subscription has expired
    const now = new Date()
    if (now > subscriptionEndDate) return false
  }

  // If the subscription is valid, check if it meets the required plan level
  const planLevels = { free: 0, basic: 1, premium: 2, annual: 2 }
  return (
    (planLevels[subscriptionPlan as keyof typeof planLevels] || 0) >=
    (planLevels[requiredPlan as keyof typeof planLevels] || 0)
  )
}

// Calculate remaining days for a subscription
export function getRemainingDays(subscriptionEndDate: Date | undefined): number {
  if (!subscriptionEndDate) return 0

  const now = new Date()
  const endDate = new Date(subscriptionEndDate)
  const diffTime = endDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays : 0
}

// Format price for display
export function formatPrice(price: number): string {
  return price === 0 ? "Free" : `$${price.toFixed(2)}`
}

