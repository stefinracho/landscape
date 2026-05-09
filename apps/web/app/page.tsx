import { Hero } from "@/components/blocks/hero"
import { mockHomePageData } from "@/lib/mock-data"

export default function Page() {
  return (
    <main>
      {mockHomePageData.blocks.map((block) => {
        switch (block.__component) {
          case "blocks.hero":
            return (
              <Hero
                key={block.id}
                headline={block.headline}
                subheadline={block.subheadline}
                videoUrl={block.videoUrl}
                fallbackImageUrl={block.fallbackImageUrl}
                primaryCtaText={block.primaryCtaText}
                primaryCtaLink={block.primaryCtaLink}
                secondaryCtaText={block.secondaryCtaText}
                secondaryCtaLink={block.secondaryCtaLink}
              />
            )

          default:
            return (
              <div key={block.id}>Component not found: {block.__component}</div>
            )
        }
      })}
    </main>
  )
}
