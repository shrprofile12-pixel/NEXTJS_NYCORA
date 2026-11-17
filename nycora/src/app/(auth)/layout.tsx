import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // ❌ Yahan <html> aur <body> nahi likhna!
    // ✅ Sirf yeh div ya wrapper aayega:
    <div className=" ">
      {children}
    </div>
  )
}