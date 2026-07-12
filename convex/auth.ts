import { query } from "./_generated/server"
import { authComponent, createAuth } from "./betterAuth/auth"

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    // Get session which includes user data
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx)
    const session = await auth.api.getSession({
      headers,
    })

    return session?.user || null
  },
})

export const getSession = query({
  args: {},
  handler: async (ctx) => {
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx)
    const session = await auth.api.getSession({
      headers,
    })
    return session
  },
})
