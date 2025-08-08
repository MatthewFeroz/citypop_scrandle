'use client'

import * as React from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { ConciergeBell, Brain, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

// Minimal shadcn-like primitives (local, Tailwind-styled)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const styles =
    variant === 'primary'
      ? 'bg-[#0a1f44] text-white hover:bg-[#0c2961] focus-visible:ring-[#0a1f44]'
      : 'bg-transparent text-[#0a1f44] hover:bg-slate-100 focus-visible:ring-slate-300'
  return <button className={cn(base, styles, 'px-5 py-2.5', className)} {...props} />
}

type CardProps = React.HTMLAttributes<HTMLDivElement>
function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-sm font-medium text-slate-500', className)} {...props} />
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pb-6', className)} {...props} />
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/svgs/summit-mark.svg" alt="Summit logo" width={28} height={28} priority />
            <span className="text-2xl font-semibold tracking-tight text-[#0a1f44] font-serif">Summit</span>
          </Link>
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in" className="inline-flex">
                <Button>Sign In</Button>
              </Link>
              <Link href="/onboarding" className="inline-flex">
                <Button>Create Account</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { userButtonAvatarBox: 'size-8' } }} />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#0a1f44] sm:text-5xl md:text-6xl">
            Your Private Executive Command Center
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
            All your key business numbers. One secure dashboard. Weekly insights delivered to your inbox — no setup required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/onboarding" className="inline-flex">
              <Button className="px-6 py-3 text-base">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <Card className="border-slate-200/80">
          <CardHeader className="flex items-end justify-between gap-4 pb-2 sm:items-center sm:pb-0">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Client</div>
              <div className="mt-1 text-lg font-medium text-[#0a1f44] sm:text-xl">
                Summit Athletic Club
              </div>
            </div>
            <div className="hidden rounded-full bg-[#0a1f44]/5 px-3 py-1 text-xs font-medium text-[#0a1f44] sm:block">
              Executive Overview
            </div>
          </CardHeader>
          <CardContent>
            {/* KPI Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-[#0a1f44]">$2,450,000</div>
                  <div className="mt-1 text-sm text-emerald-600">+8%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-[#0a1f44]">$1,200,000</div>
                  <div className="mt-1 text-sm text-rose-600">-3%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Active Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-[#0a1f44]">42</div>
                  <div className="mt-1 text-sm text-emerald-600">+2</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Portfolio Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-[#0a1f44]">+12%</div>
                  <div className="mt-1 text-sm text-slate-600">YoY</div>
                </CardContent>
              </Card>
            </div>

            {/* Graphs */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <MetricChart
                title="Revenue"
                color="#0a1f44"
                unit="currency"
                data={revenueData.map((d) => d.value)}
                labels={revenueData.map((d) => d.label)}
              />
              <MetricChart
                title="Expenses"
                color="#e11d48"
                unit="currency"
                data={expensesData.map((d) => d.value)}
                labels={expensesData.map((d) => d.label)}
              />
              <MetricChart
                title="Active Clients"
                color="#0a1f44"
                unit="number"
                data={clientsData.map((d) => d.value)}
                labels={clientsData.map((d) => d.label)}
              />
              <MetricChart
                title="Portfolio Growth"
                color="#16a34a"
                unit="percent"
                data={growthData.map((d) => d.value)}
                labels={growthData.map((d) => d.label)}
              />
            </div>

            {/* LTV/CAC Focus Card */}
            <div className="mt-6">
              <LtvCacCard />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            icon={<ConciergeBell className="h-6 w-6 text-[#0a1f44]" />}
            title="Concierge Onboarding"
            description="We handle every integration for you, so you can focus on decisions, not data."
          />
          <Feature
            icon={<Brain className="h-6 w-6 text-[#0a1f44]" />}
            title="AI-Driven Insights"
            description="Receive weekly, plain-English reports highlighting opportunities and risks."
          />
          <Feature
            icon={<Shield className="h-6 w-6 text-[#0a1f44]" />}
            title="Bank-Level Security"
            description="Your data is encrypted in transit and at rest, hosted on private infrastructure."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-14">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-[#0a1f44] sm:text-3xl">
            Join an exclusive group of leaders who run their business from the Summit.
          </h2>
          <div className="mt-8 flex items-center justify-center">
            <Link href="/onboarding" className="inline-flex">
              <Button className="px-6 py-3 text-base">Request Access</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1f44]/5">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#0a1f44]">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  )
}

// ---- LTV/CAC Card ----
function LtvCacCard() {
  const [inputs, setInputs] = React.useState({
    marketingSpend: undefined as number | undefined,
    salesSpend: undefined as number | undefined,
    newCustomers: undefined as number | undefined,
    arpa: undefined as number | undefined,
    grossMarginPct: undefined as number | undefined,
    churnMonthlyPct: undefined as number | undefined,
  })

  const valid =
    inputs.marketingSpend != null &&
    inputs.salesSpend != null &&
    inputs.newCustomers != null &&
    inputs.arpa != null &&
    inputs.grossMarginPct != null &&
    inputs.churnMonthlyPct != null &&
    inputs.newCustomers! > 0

  // Monthly CAC and LTV
  const cac = valid ? (inputs.marketingSpend! + inputs.salesSpend!) / inputs.newCustomers! : 0
  const lifespanMonths = valid ? 1 / Math.max(0.0001, inputs.churnMonthlyPct!) : 0
  const ltv = valid ? inputs.arpa! * inputs.grossMarginPct! * lifespanMonths : 0
  const ratio = valid && cac > 0 ? ltv / cac : 0

  const gaugePct = Math.max(0, Math.min(1, ratio / 5)) // normalize 0..5+ into 0..1

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#0a1f44]">LTV/CAC Ratio</h3>
          <div className="text-sm text-slate-600">Target ≥ 3.0</div>
        </div>
        {/* Gauge */}
        <div className="relative mx-auto h-44 w-full max-w-[220px]">
          <GaugeCircle valuePct={gaugePct} color={ratio >= 3 ? '#16a34a' : '#e11d48'} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-3xl font-semibold"
              style={{ color: ratio >= 3 ? '#16a34a' : '#e11d48' }}
            >
              {valid ? `${ratio.toFixed(2)}x` : '—'}
            </div>
            <div className="mt-1 text-xs text-slate-600">LTV/CAC</div>
          </div>
        </div>

        {/* Compare bubbles (CAC on left, LTV on right) */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">CAC</div>
            <div className="mt-1 text-xl font-semibold text-[#0a1f44]">{valid ? formatValue(cac, 'currency') : '—'}</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">LTV</div>
            <div className="mt-1 text-xl font-semibold text-[#0a1f44]">{valid ? formatValue(ltv, 'currency') : '—'}</div>
          </div>
        </div>
        <div className="mt-3 text-center text-sm text-slate-600">
          {valid ? (
            <>
              Ratio = LTV / CAC = <span className="font-medium text-[#0a1f44]">{formatValue(ltv, 'currency')}</span> /{' '}
              <span className="font-medium text-[#0a1f44]">{formatValue(cac, 'currency')}</span> ={' '}
              <span className="font-semibold text-[#0a1f44]">{ratio.toFixed(2)}x</span>
            </>
          ) : (
            'Enter inputs to calculate LTV/CAC ratio'
          )}
        </div>
      </div>

      {/* Inputs */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h4 className="text-base font-semibold text-[#0a1f44]">Inputs (Monthly)</h4>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Marketing Spend (mo)"
            value={inputs.marketingSpend ?? ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, marketingSpend: isNaN(v) ? undefined : v }))}
            prefix="$"
          />
          <NumberField
            label="Sales Spend (mo)"
            value={inputs.salesSpend ?? ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, salesSpend: isNaN(v) ? undefined : v }))}
            prefix="$"
          />
          <NumberField
            label="New Customers (mo)"
            value={inputs.newCustomers ?? ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, newCustomers: isNaN(v) ? undefined : v }))}
          />
          <NumberField
            label="Avg Monthly Revenue (ARPA)"
            value={inputs.arpa ?? ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, arpa: isNaN(v) ? undefined : v }))}
            prefix="$"
          />
          <NumberField
            label="Gross Margin %"
            value={inputs.grossMarginPct != null ? Math.round(inputs.grossMarginPct * 100) : ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, grossMarginPct: isNaN(v) ? undefined : clampPct(v) }))}
            suffix="%"
          />
          <NumberField
            label="Monthly Churn %"
            value={inputs.churnMonthlyPct != null ? Math.round(inputs.churnMonthlyPct * 1000) / 10 : ('' as unknown as number)}
            onChange={(v) => setInputs((s) => ({ ...s, churnMonthlyPct: isNaN(v) ? undefined : clampPct(v) }))}
            suffix="%"
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">Enter monthly spend and new customers. LTV uses monthly ARPA, margin, and churn.</p>
      </div>
    </div>
  )
}

function clampPct(v: number) {
  const pct = v > 1 ? v / 100 : v
  return Math.max(0, Math.min(1, pct))
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-600">{label}</span>
      <div className="mt-1 flex items-center overflow-hidden rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-[#0a1f44]">
        {prefix ? (
          <span className="px-2 text-slate-500">{prefix}</span>
        ) : null}
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 outline-none"
          value={value as unknown as string}
          onChange={(e) => onChange(e.target.value === '' ? (NaN as unknown as number) : parseFloat(e.target.value))}
        />
        {suffix ? (
          <span className="px-2 text-slate-500">{suffix}</span>
        ) : null}
      </div>
    </label>
  )
}

function GaugeCircle({ valuePct, color }: { valuePct: number; color: string }) {
  const size = 180
  const stroke = 12
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, valuePct))
  const dash = circumference
  const offset = circumference * (1 - pct)

  return (
    <svg width={size} height={size} className="mx-auto block">
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#e2e8f0"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={dash}
          strokeDashoffset={offset}
        />
      </g>
    </svg>
  )
}

// ---- Faux data for a white-glove wealth firm like Sterling Capital Partners ----
// Mock data for a premium gym business (monthly)
const revenueData = [
  { label: 'Jan', value: 82000 },
  { label: 'Feb', value: 84000 },
  { label: 'Mar', value: 88500 },
  { label: 'Apr', value: 90000 },
  { label: 'May', value: 91500 },
  { label: 'Jun', value: 94000 },
  { label: 'Jul', value: 96500 },
  { label: 'Aug', value: 97200 },
  { label: 'Sep', value: 99000 },
  { label: 'Oct', value: 100500 },
  { label: 'Nov', value: 101200 },
  { label: 'Dec', value: 103000 },
]

const expensesData = [
  { label: 'Jan', value: 56000 },
  { label: 'Feb', value: 56500 },
  { label: 'Mar', value: 57000 },
  { label: 'Apr', value: 57500 },
  { label: 'May', value: 58000 },
  { label: 'Jun', value: 59000 },
  { label: 'Jul', value: 60000 },
  { label: 'Aug', value: 60200 },
  { label: 'Sep', value: 60500 },
  { label: 'Oct', value: 61000 },
  { label: 'Nov', value: 61200 },
  { label: 'Dec', value: 62000 },
]

const clientsData = [
  { label: 'Jan', value: 1060 },
  { label: 'Feb', value: 1085 },
  { label: 'Mar', value: 1110 },
  { label: 'Apr', value: 1135 },
  { label: 'May', value: 1160 },
  { label: 'Jun', value: 1180 },
  { label: 'Jul', value: 1195 },
  { label: 'Aug', value: 1200 },
  { label: 'Sep', value: 1210 },
  { label: 'Oct', value: 1225 },
  { label: 'Nov', value: 1230 },
  { label: 'Dec', value: 1240 },
]

const growthData = [
  { label: 'Jan', value: 2.5 },
  { label: 'Feb', value: 2.8 },
  { label: 'Mar', value: 3.1 },
  { label: 'Apr', value: 3.4 },
  { label: 'May', value: 3.6 },
  { label: 'Jun', value: 3.9 },
  { label: 'Jul', value: 4.1 },
  { label: 'Aug', value: 4.3 },
  { label: 'Sep', value: 4.6 },
  { label: 'Oct', value: 4.9 },
  { label: 'Nov', value: 5.1 },
  { label: 'Dec', value: 5.4 },
]

// ---- Lightweight SVG sparkline-like chart ----
function MetricChart({
  title,
  data,
  labels,
  unit,
  color,
}: {
  title: string
  data: number[]
  labels: string[]
  unit: 'currency' | 'number' | 'percent'
  color: string
}) {
  const width = 560
  const height = 180
  const paddingX = 24
  const paddingY = 24

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = Math.max(1, max - min)

  const points = data.map((v, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1)
    const y = height - paddingY - ((v - min) / range) * (height - paddingY * 2)
    return [x, y] as const
  })

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`))
    .join(' ')

  const latest = data[data.length - 1]
  const delta = latest - data[0]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-600">{title}</div>
        <div className="text-right">
          <div className="text-lg font-semibold text-[#0a1f44]">
            {formatValue(latest, unit)}
          </div>
          <div className={cn('text-xs', delta >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
            {delta >= 0 ? '+' : ''}
            {unit === 'percent' ? delta.toFixed(1) + '%' : formatCompact(delta, unit)}
          </div>
        </div>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full">
          <defs>
            <linearGradient id={`grad-${title}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Axis baseline */}
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={height - paddingY}
            y2={height - paddingY}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          {/* Area fill */}
          <path
            d={`${pathD} L ${width - paddingX},${height - paddingY} L ${paddingX},${height - paddingY} Z`}
            fill={`url(#grad-${title})`}
          />
          {/* Line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
          {/* Dots */}
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.2} fill={color} />
          ))}
        </svg>
        {/* X labels */}
        <div className="mt-2 grid grid-cols-6 gap-2 text-[11px] text-slate-500 sm:text-xs">
          {labels.map((l, i) => (
            <div key={l + i} className="truncate">
              {i % 2 === 0 ? l : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatValue(value: number, unit: 'currency' | 'number' | 'percent') {
  if (unit === 'currency') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  if (unit === 'percent') return `${value.toFixed(1)}%`
  return new Intl.NumberFormat('en-US').format(value)
}

function formatCompact(value: number, unit: 'currency' | 'number' | 'percent') {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (unit === 'percent') return `${sign}${abs.toFixed(1)}%`
  if (unit === 'currency') {
    const formatted = abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(1)}M`
      : abs >= 1_000
      ? `$${(abs / 1_000).toFixed(1)}k`
      : `$${abs.toFixed(0)}`
    return sign + formatted
  }
  return sign + (abs >= 1_000_000 ? (abs / 1_000_000).toFixed(1) + 'M' : abs >= 1_000 ? (abs / 1_000).toFixed(1) + 'k' : abs.toFixed(0))
}
