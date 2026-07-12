import { NextRequest, NextResponse } from "next/server"

import { api } from "./convex/_generated/api"
import { fetchAuthQuery } from "./lib/auth-server"

const basePath = "/better"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const currentUser = await fetchAuthQuery(api.auth.getCurrentUser, {})

  console.log("session", currentUser)

  // Public routes that don't require authentication
  const publicRoutes = ["/signin", "/signup"]
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  const isOnboardingRoute = pathname.startsWith("/onboarding")

  // If user is not authenticated
  if (!currentUser) {
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next()
    }
    // Redirect to signin for all other routes
    return NextResponse.redirect(new URL(`${basePath}/signin`, request.url))
  }

  // User is authenticated
  const mustChangePassword = (currentUser as any).mustChangePassword === true

  // If user must change password
  if (mustChangePassword) {
    // Allow access to onboarding route
    if (isOnboardingRoute) {
      return NextResponse.next()
    }
    // Redirect to onboarding for all other routes
    return NextResponse.redirect(new URL(`${basePath}/onboarding`, request.url))
  }

  // User is authenticated and doesn't need to change password
  // Block access to public routes (signin, signup)
  if (isPublicRoute) {
    return NextResponse.redirect(new URL(`${basePath}/`, request.url))
  }

  // Block access to onboarding if not needed
  if (isOnboardingRoute) {
    return NextResponse.redirect(new URL(`${basePath}/`, request.url))
  }

  // Allow access to all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/signin/:path*", "/signup/:path*", "/onboarding/:path*"],
}
