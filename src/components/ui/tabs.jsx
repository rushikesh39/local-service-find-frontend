import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext({
  value: "",
  onValueChange: () => {},
})

const Tabs = ({ defaultValue, value, onValueChange, children, className, ...props }) => {
  const [selected, setSelected] = React.useState(value || defaultValue || "")

  const currentValue = value !== undefined ? value : selected
  const handleValueChange = (val) => {
    if (value === undefined) setSelected(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-xl bg-slate-100 p-1 text-slate-500 w-full",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const isSelected = context.value === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 flex-1 cursor-pointer",
        isSelected
          ? "bg-white text-[#00897B] shadow-xs"
          : "text-slate-600 hover:text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (context.value !== value) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("mt-4 focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
