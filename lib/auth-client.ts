import { convexClient } from "@convex-dev/better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import {
  adminClient,
  organizationClient,
  usernameClient,
} from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL! + "/better/api/auth",
  plugins: [
    convexClient(),
    adminClient(),
    usernameClient(),
    organizationClient({
      teams: {
        enabled: true,
      },
    }),
  ],
})
