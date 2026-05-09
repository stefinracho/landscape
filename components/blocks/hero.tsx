import Link from "next/link"
import { Phone } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeroProps {
  headline: string
  subheadline: string
  videoUrl: string
  fallbackImageUrl: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
}

export function Hero({
  headline,
  subheadline,
  videoUrl,
  fallbackImageUrl,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <section className="relative flex h-[85svh] items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={fallbackImageUrl}
        className="absolute inset-0 -z-1 h-full w-full object-cover brightness-30"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Foreground Content */}
      <div className="grid max-w-7xl justify-items-center gap-6 px-4 text-center text-balance">
        <h1 className="max-w-4xl text-[clamp(1rem,5vw+1rem,5rem)] leading-none font-extrabold tracking-tighter text-primary-foreground">
          {headline}
        </h1>
        <p className="max-w-md text-primary-foreground/80">{subheadline}</p>

        {/* Call to Actions */}
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Link
            href={primaryCtaLink}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto"
            )}
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaLink}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent text-primary-foreground"
            )}
          >
            <Phone />
            {secondaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  )
}
