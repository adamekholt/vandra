// "use client";

// import { mergeProps } from "@base-ui/react/merge-props";
// import { Select as SelectPrimitive } from "@base-ui/react/select";
// import { useRender } from "@base-ui/react/use-render";
// import { cva, type VariantProps } from "class-variance-authority";
// import {
//   ChevronDownIcon,
//   ChevronsUpDownIcon,
//   ChevronUpIcon,
// } from "lucide-react";
// import type * as React from "react";

// import { cn } from "@/lib/utils";

// export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;

// export const selectTriggerVariants = cva(
//   "relative inline-flex min-h-9 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-visible,[aria-invalid],[data-pressed]]:shadow-none",
//   {
//     defaultVariants: {
//       size: "default",
//     },
//     variants: {
//       size: {
//         default: "",
//         lg: "min-h-10 sm:min-h-9",
//         sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7",
//       },
//     },
//   },
// );

// const selectTriggerIconClassName = "-me-1 size-4.5 opacity-80 sm:size-4";

// export interface SelectButtonProps extends useRender.ComponentProps<"button"> {
//   size?: VariantProps<typeof selectTriggerVariants>["size"];
// }

// export function SelectButton({
//   className,
//   size,
//   render,
//   children,
//   ...props
// }: SelectButtonProps): React.ReactElement {
//   const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
//     render ? undefined : "button";

//   const defaultProps = {
//     children: (
//       <>
//         <span className="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
//           {children}
//         </span>
//         <ChevronsUpDownIcon className={selectTriggerIconClassName} />
//       </>
//     ),
//     className: cn(selectTriggerVariants({ size }), "min-w-0", className),
//     "data-slot": "select-button",
//     type: typeValue,
//   };

//   return useRender({
//     defaultTagName: "button",
//     props: mergeProps<"button">(defaultProps, props),
//     render,
//   });
// }

// export function SelectTrigger({
//   className,
//   size = "default",
//   children,
//   ...props
// }: SelectPrimitive.Trigger.Props &
//   VariantProps<typeof selectTriggerVariants>): React.ReactElement {
//   return (
//     <SelectPrimitive.Trigger
//       className={cn(selectTriggerVariants({ size }), className)}
//       data-slot="select-trigger"
//       {...props}
//     >
//       {children}
//       <SelectPrimitive.Icon data-slot="select-icon">
//         <ChevronsUpDownIcon className={selectTriggerIconClassName} />
//       </SelectPrimitive.Icon>
//     </SelectPrimitive.Trigger>
//   );
// }

// export function SelectValue({
//   className,
//   ...props
// }: SelectPrimitive.Value.Props): React.ReactElement {
//   return (
//     <SelectPrimitive.Value
//       className={cn(
//         "flex-1 truncate data-placeholder:text-muted-foreground",
//         className,
//       )}
//       data-slot="select-value"
//       {...props}
//     />
//   );
// }

// export function SelectPopup({
//   className,
//   children,
//   side = "bottom",
//   sideOffset = 4,
//   align = "start",
//   alignOffset = 0,
//   alignItemWithTrigger = true,
//   anchor,
//   ...props
// }: SelectPrimitive.Popup.Props & {
//   side?: SelectPrimitive.Positioner.Props["side"];
//   sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
//   align?: SelectPrimitive.Positioner.Props["align"];
//   alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
//   alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
//   anchor?: SelectPrimitive.Positioner.Props["anchor"];
// }): React.ReactElement {
//   return (
//     <SelectPrimitive.Portal>
//       <SelectPrimitive.Positioner
//         align={align}
//         alignItemWithTrigger={alignItemWithTrigger}
//         alignOffset={alignOffset}
//         anchor={anchor}
//         className="z-50 select-none"
//         data-slot="select-positioner"
//         side={side}
//         sideOffset={sideOffset}
//       >
//         <SelectPrimitive.Popup
//           className="origin-(--transform-origin) text-foreground"
//           data-slot="select-popup"
//           {...props}
//         >
//           <SelectPrimitive.ScrollUpArrow
//             className="top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover"
//             data-slot="select-scroll-up-arrow"
//           >
//             <ChevronUpIcon className="relative size-4.5 sm:size-4" />
//           </SelectPrimitive.ScrollUpArrow>
//           <div className="relative h-full min-w-(--anchor-width) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]">
//             <SelectPrimitive.List
//               className={cn(
//                 "max-h-(--available-height) overflow-y-auto p-1",
//                 className,
//               )}
//               data-slot="select-list"
//             >
//               {children}
//             </SelectPrimitive.List>
//           </div>
//           <SelectPrimitive.ScrollDownArrow
//             className="bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover"
//             data-slot="select-scroll-down-arrow"
//           >
//             <ChevronDownIcon className="relative size-4.5 sm:size-4" />
//           </SelectPrimitive.ScrollDownArrow>
//         </SelectPrimitive.Popup>
//       </SelectPrimitive.Positioner>
//     </SelectPrimitive.Portal>
//   );
// }

// export function SelectItem({
//   className,
//   children,
//   ...props
// }: SelectPrimitive.Item.Props): React.ReactElement {
//   return (
//     <SelectPrimitive.Item
//       className={cn(
//         "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
//         className,
//       )}
//       data-slot="select-item"
//       {...props}
//     >
//       <SelectPrimitive.ItemIndicator className="col-start-1">
//         <svg
//           fill="none"
//           height="24"
//           stroke="currentColor"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           width="24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
//         </svg>
//       </SelectPrimitive.ItemIndicator>
//       <SelectPrimitive.ItemText className="col-start-2 min-w-0">
//         {children}
//       </SelectPrimitive.ItemText>
//     </SelectPrimitive.Item>
//   );
// }

// export function SelectSeparator({
//   className,
//   ...props
// }: SelectPrimitive.Separator.Props): React.ReactElement {
//   return (
//     <SelectPrimitive.Separator
//       className={cn("mx-2 my-1 h-px bg-border", className)}
//       data-slot="select-separator"
//       {...props}
//     />
//   );
// }

// export function SelectGroup(
//   props: SelectPrimitive.Group.Props,
// ): React.ReactElement {
//   return <SelectPrimitive.Group data-slot="select-group" {...props} />;
// }

// export function SelectGroupLabel(
//   props: SelectPrimitive.GroupLabel.Props,
// ): React.ReactElement {
//   return (
//     <SelectPrimitive.GroupLabel
//       className="px-2 py-1.5 font-medium text-muted-foreground text-xs"
//       data-slot="select-group-label"
//       {...props}
//     />
//   );
// }

// export { SelectPrimitive, SelectPopup as SelectContent };

"use client"
import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"
const Select = SelectPrimitive.Root
function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}
function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-lg shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}
function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("text-muted-foreground px-1.5 py-1 text-xs", className)}
      {...props}
    />
  )
}
function SelectItem({
  className,
  children,
  value,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      value={value}
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 gap-2 shrink-0 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"><CheckIcon className="pointer-events-none" /></span>} />
    </SelectPrimitive.Item>
  )
}
function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border -mx-1 my-1 h-px pointer-events-none", className)}
      {...props}
    />
  )
}
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 top-0 w-full", className)}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 bottom-0 w-full", className)}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
