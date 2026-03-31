import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function ListWrapper({
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <div className={`${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <ScrollArea className="max-h-[500px] pr-2">
        <div className="space-y-3">{children}</div>
      </ScrollArea>
    </div>
  );
}