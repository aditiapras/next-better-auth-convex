import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { getToken } from "@/lib/auth-server"
import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "sonner"

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" })

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await getToken()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        interHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <ConvexClientProvider initialToken={token}>
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: "var(--font-sans)",
                },
              }}
              closeButton
            />
            <TooltipProvider>{children}</TooltipProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
