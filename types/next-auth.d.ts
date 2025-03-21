import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      subscriptionPlan?: string
      subscriptionEndDate?: Date
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    subscriptionPlan?: string
    subscriptionEndDate?: Date | null
  }
}

