"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import FiltersPanel from "../features/map/filters/FilterPanel"

export function FilterSheet() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000]">
        <Sheet>
        <SheetTrigger
            render={
            <Button className="w-full min-h-[10vh]" variant={"outline"}>
                Filter
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
                    <SheetClose/>
                </div>
            </SheetHeader>

            <div className="px-6 pb-4 flex-1 overflow-y-auto">
                <FiltersPanel />
            </div>
            </div>
        </SheetContent>
        </Sheet>
    </div>
  )
}