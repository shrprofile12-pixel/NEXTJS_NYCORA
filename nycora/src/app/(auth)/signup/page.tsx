"use client"

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { signUpSchema, type SignUpFormValues } from "@/lib/validations/auth"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password?: string[]
  }>({})
  
  const [serverMessage, setServerMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerMessage('')
    setErrors({})

    const result = signUpSchema.safeParse(formData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setServerMessage("Account created successfully!")
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-amber-200 flex items-center justify-center p-2">
      <Dialog open={true}>
        <DialogContent className="w-full max-w-md text-black bg-amber-100 border-2 border-black shadow-lg p-4 overflow-hidden [&>button]:hidden">
          <DialogHeader className="p-0 mb-1">
            <div className="flex flex-col items-center justify-center leading-tight">
              <h2 className="text-xl uppercase font-bold text-black">nycora</h2>
              <DialogTitle className="text-xl font-normal text-black">
                Create Account <span className="text-blue-500">!</span>
              </DialogTitle>
              <DialogDescription className="text-gray-800 text-xs mt-0.5">
                Enter your details to register a new account.
              </DialogDescription>
            </div>
          </DialogHeader>

          <Card className="bg-transparent border-none shadow-none text-black p-0 gap-2">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit}>
                <FieldSet>
                  <FieldGroup className="text-black space-y-2 gap-1.5">
                    
                    {/* Firstname & Lastname Row */}
                    <div className="flex items-start justify-center gap-2">
                      <Field className="text-black w-full gap-1">
                        <FieldLabel htmlFor="firstName" className="text-xs leading-none">Firstname</FieldLabel>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          autoComplete="given-name"
                          placeholder="Evil"
                          className="h-8 text-sm border-black bg-white text-black"
                        />
                        {errors.firstName && (
                          <FieldError className="text-[11px] leading-tight text-red-600 font-semibold">
                            {errors.firstName[0]}
                          </FieldError>
                        )}
                      </Field>

                      <Field className="text-black w-full gap-1">
                        <FieldLabel htmlFor="lastName" className="text-xs leading-none">Lastname</FieldLabel>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          autoComplete="family-name"
                          placeholder="Rabbit"
                          className="h-8 text-sm text-black border-black bg-white"
                        />
                        {errors.lastName && (
                          <FieldError className="text-[11px] leading-tight text-red-600 font-semibold">
                            {errors.lastName[0]}
                          </FieldError>
                        )}
                      </Field>
                    </div>

                    {/* Email Field */}
                    <Field className="text-black gap-1">
                      <FieldLabel htmlFor="email" className="text-xs leading-none">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        autoComplete="email"
                        placeholder="rabbit@example.com"
                        className="h-8 text-sm text-black border-black bg-white"
                      />
                      {errors.email && (
                        <FieldError className="text-[11px] leading-tight text-red-600 font-semibold">
                          {errors.email[0]}
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
                        autoComplete="new-password"
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
                      <p className="text-xs text-green-700 font-semibold">{serverMessage}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-9 mt-1 bg-black text-white hover:bg-gray-800 border-2 border-black"
                    >
                      {isLoading ? 'Creating account...' : 'Sign Up'}
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
                  Sign up with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-8 text-sm border-2 border-black text-black hover:bg-amber-200"
                  onClick={() => signIn('github', { callbackUrl: '/' })}
                >
                  Sign up with GitHub
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-center gap-1.5 pt-2.5 px-0 pb-0">
              <p className="text-xs text-gray-700">Already have an account?</p>
              <Link
                href="/signin"
                className="text-xs text-blue-900 font-medium hover:underline"
              >
                Sign In
              </Link>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default SignUpPage