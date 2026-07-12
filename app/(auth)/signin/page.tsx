"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const signinSchema = z.object({
  username: z
    .string()
    .min(8, "Username must be exactly 8 characters")
    .max(8, "Username must be exactly 8 characters")
    .regex(/^\d+$/, "Username must contain only numbers"),
  password: z.string().min(1, "Password is required"),
})

type SigninFormValues = z.infer<typeof signinSchema>

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = async (data: SigninFormValues) => {
    console.log("Form submitted:", data)
    await authClient.signIn.username(
      {
        username: data.username,
        password: data.password,
        callbackURL: "/better",
      },
      {
        onSuccess: () => {
          toast("Redirecting...")
        },
        onError: (error) => {
          toast(error.error.message)
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="font-semibold">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!errors.username}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  type="text"
                  inputMode="numeric"
                  placeholder="12345678"
                  maxLength={8}
                  aria-invalid={!!errors.username}
                  {...register("username")}
                  disabled={isSubmitting}
                />
              </InputGroup>
              {errors.username && (
                <FieldError>{errors.username.message}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  disabled={isSubmitting}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon data-icon="inline-start" />
                    ) : (
                      <EyeIcon data-icon="inline-start" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Don't have an account? Please contact your administrator.
        </p>
      </div>
    </div>
  )
}
