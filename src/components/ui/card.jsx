import * as React from "react"

import { cn } from "../../lib/utils"

export function Card({ className, ...props }) {
  return (
    <div className={cn("rounded-2xl border bg-white p-4 shadow", className)} {...props} />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-2", className)} {...props} />
  )
}
