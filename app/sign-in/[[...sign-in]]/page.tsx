"use client"

import Link from 'next/link'
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="min-h-dvh bg-white">
      {/* Header */}
      <header className="border-b border-slate-200/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="text-xl font-semibold tracking-tight text-[#0a1f44]">
            <span className="font-serif">Summit</span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100dvh-65px)] max-w-7xl grid-cols-1 items-stretch px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* Left copy */}
        <div className="flex flex-col justify-center py-12 pr-0 lg:pr-16">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0a1f44] sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-4 max-w-md text-slate-600">
            Sign in to access your executive dashboard and AI-powered weekly insights.
          </p>
          <p className="mt-8 text-slate-600">
            New to Summit?{' '}
            <Link href="/onboarding" className="text-[#0a1f44] underline-offset-2 hover:underline">
              Create an account
            </Link>
            .
          </p>
        </div>

        {/* Right auth card */}
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SignedOut>
              <SignIn
                afterSignInUrl="/"
                appearance={{
                  variables: {
                    colorPrimary: '#0a1f44',
                    colorText: '#0a1f44',
                    colorBackground: 'white',
                    colorInputBackground: 'white',
                  },
                  elements: {
                    formButtonPrimary:
                      'bg-[#0a1f44] hover:bg-[#0c2961] text-white font-medium',
                    footerActionLink: 'text-[#0a1f44] hover:underline',
                    card: 'shadow-none border-0 p-0',
                  },
                }}
              />
            </SignedOut>
            <SignedIn>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-[#0a1f44]">You’re already signed in</h2>
                <p className="mt-2 text-slate-600">Head back to the app to continue.</p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-md bg-[#0a1f44] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0c2961]"
                  >
                    Go to Home
                  </Link>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </section>
    </main>
  )
}


