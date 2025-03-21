import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Protected routes that require authentication
const authRoutes = ["/profile", "/settings"]

// Premium routes that require a subscription
const premiumRoutes = ["/ask-questions", "/forum", "/resources"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Check if the route requires a premium subscription
  const isPremiumRoute = premiumRoutes.some((route) => pathname.startsWith(route))

  // Get the user's session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If the route requires authentication and the user is not logged in,
  // redirect to the login page
  if (isAuthRoute && !token) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // If the route requires a premium subscription
  if (isPremiumRoute) {
    // If the user is not logged in, redirect to the login page
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // If the user has a free subscription, redirect to the pricing page
    const subscriptionPlan = token.subscriptionPlan as string
    const subscriptionEndDate = token.subscriptionEndDate as Date | undefined

    // Check if the subscription is valid
    const isValidSubscription = subscriptionPlan && subscriptionPlan !== "free"
    const isExpired = subscriptionEndDate ? new Date() > new Date(subscriptionEndDate) : true

    if (!isValidSubscription || isExpired) {
      // Allow access to the stream pages even with a free subscription
      if (pathname.startsWith("/stream")) {
        return NextResponse.next()
      }

      const url = new URL("/pricing", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/settings/:path*",
    "/stream/:path*",
    "/ask-questions/:path*",
    "/forum/:path*",
    "/resources/:path*",
  ],
}

