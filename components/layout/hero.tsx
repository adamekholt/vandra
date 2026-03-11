"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroAction = {
    label: string;
    href: string;
    variant?: "default" | "outline";
};

type HeroProps = {
    title: string;
    description?: string;
    actions?: HeroAction[];
};

export function Hero({ title, description, actions = [] }: HeroProps) {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center gap-6">

          <h1 className="text-4xl font-bold">{title}</h1>

          {description && (
            <p className="max-w-xl text-muted-foreground">
              {description}
            </p>
          )}

          {actions.length > 0 && (
            <div className="flex gap-4">

              {actions.map((action) => (
                <Button
                  key={action.href}
                  variant={action.variant ?? "default"}
                  render={(props) => (
                    <Link {...props} href={action.href} />
                  )}
                >
                  {action.label}
                </Button>
              ))}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}