"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FormSheet({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000]">
      <Sheet>
        <SheetTrigger
          render={
            <Button className="w-full min-h-[10vh]" variant={"outline"}>
              Lägg till information
            </Button>
          }
        />

        <SheetContent
          side="bottom"
          className="z-[9999] max-h-[80vh] rounded-t-2xl"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-6 pb-2">
              <div className="flex justify-between items-center">
                <SheetClose />
              </div>
            </SheetHeader>

            <div className="px-6 pb-4 flex-1 overflow-y-auto">
              <div className="w-full max-w-md mx-auto">
                {children}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}