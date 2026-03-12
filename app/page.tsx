import { Hero } from "@/components/layout/hero";

export default function Page() {
  return (
    <>
      <Hero
        title="Landingpage"
        description="Text"
        actions={[
          { label: "Discover page", href: "/discover" },
          { label: "Map page", href: "/map", variant: "outline" },
        ]}
      />
    </>
  );
}