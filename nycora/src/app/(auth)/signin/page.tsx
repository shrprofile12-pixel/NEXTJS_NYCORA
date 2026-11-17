"use client"

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { authSchema, type AuthFormValues } from "@/lib/validations/auth"
import layout from "../layout"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {
  const [formData, setFormData] = useState<AuthFormValues>({
    name: '',
    password: '',
  })

  const [errors, setErrors] = useState<{ name?: string[]; password?: string[] }>({})
  const [serverMessage, setServerMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerMessage('')
    setErrors({})

    const result = authSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-amber-200 flex items-center justify-center p-2">
      <div className="w-full max-w-md">
        <Card className="bg-amber-100 text-black border-2 border-black shadow-lg p-4 gap-2">
          
          {/* NYCORA Brand Header inside Card */}
          <CardHeader className="p-0 pb-1 text-center">
            <h2 className="text-xl uppercase font-bold tracking-wider text-black">nycora</h2>
            <CardTitle className="text-lg font-normal text-black mt-0.5">
              Welcome Back <span className="text-blue-500">!</span>
            </CardTitle>
            <CardDescription className="text-gray-800 text-xs mt-0.5">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleSubmit}>
              <FieldSet>
                <FieldGroup className="text-black space-y-2 gap-1.5">
                  {/* Username Field */}
                  <Field className="text-black gap-1">
                    <FieldLabel htmlFor="name" className="text-xs leading-none">Username</FieldLabel>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      autoComplete="off"
                      placeholder="Evil Rabbit"
                      className="h-8 text-sm border-black bg-white text-black"
                    />
                    {errors.name && (
                      <FieldError className="text-[11px] leading-tight text-red-600 font-semibold">
                        {errors.name[0]}
                      </FieldError>
                    )}
                  </Field>

                  {/* Password Field */}
                  <Field className="text-black gap-1">
                    <FieldLabel htmlFor="password" className="text-xs leading-none">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      autoComplete="off"
                      placeholder="••••••••"
                      className="h-8 text-sm text-black border-black bg-white"
                    />
                    {errors.password && (
                      <FieldError className="text-[11px] leading-tight text-red-600 font-semibold">
                        {errors.password[0]}
                      </FieldError>
                    )}
                  </Field>

                  {serverMessage && (
                    <p className="text-xs text-red-600 font-semibold">{serverMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-9 mt-1 bg-black text-white hover:bg-gray-800 border-2 border-black"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </FieldGroup>
              </FieldSet>
            </form>

            <div className="relative my-2.5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-black" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-amber-100 px-2 text-black font-semibold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth NextAuth Provider Buttons */}
            <div className="flex flex-col gap-1.5">
              <Button
                type="button"
                variant="outline"
                className="w-full h-8 text-sm border-2 border-black text-black hover:bg-amber-200"
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                Sign in with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-8 text-sm border-2 border-black text-black hover:bg-amber-200"
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                Sign in with GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-center gap-1.5 pt-2.5 px-0 pb-0">
            <p className="text-xs text-gray-700">Don't have an account?</p>
            <Link
              href="/signup"
              className="text-xs text-blue-900 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default Page