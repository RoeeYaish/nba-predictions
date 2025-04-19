import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../../lib/utils"

export function Button({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-white font-medium shadow hover:bg-gray-800 transition",
        className
      )}
      {...props}
    />
  )
}
