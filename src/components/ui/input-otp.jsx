import * as React from "react"
import { cn } from "@/lib/utils"

const OTPInputContext = React.createContext({
  otp: [],
  inputRefs: { current: [] },
  onChange: () => {},
  onKeyDown: () => {},
  onPaste: () => {},
})

function InputOTP({
  value = "",
  onChange,
  maxLength = 6,
  children,
  className,
  ...props
}) {
  const inputRefs = React.useRef([])
  
  const otpArray = React.useMemo(() => {
    const arr = Array(maxLength).fill("")
    if (value) {
      for (let i = 0; i < Math.min(value.length, maxLength); i++) {
        arr[i] = value[i]
      }
    }
    return arr
  }, [value, maxLength])

  const handleInputChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;

    const newValue = [...otpArray]
    newValue[index] = val
    const stringValue = newValue.join("")
    
    onChange?.(stringValue)

    if (val && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        const newValue = [...otpArray]
        newValue[index - 1] = ""
        onChange?.(newValue.join(""))
        inputRefs.current[index - 1]?.focus()
      } else if (otpArray[index]) {
        const newValue = [...otpArray]
        newValue[index] = ""
        onChange?.(newValue.join(""))
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim().slice(0, maxLength)
    if (!/^\d+$/.test(pastedData)) return

    onChange?.(pastedData)
    const nextFocusIndex = Math.min(pastedData.length, maxLength - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  return (
    <OTPInputContext.Provider
      value={{
        otp: otpArray,
        inputRefs,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        onPaste: handlePaste,
      }}
    >
      <div className={cn("flex items-center justify-center gap-2", className)} {...props}>
        {children}
      </div>
    </OTPInputContext.Provider>
  )
}

function InputOTPGroup({ className, ...props }) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  )
}

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const { otp, inputRefs, onChange, onKeyDown, onPaste } = React.useContext(OTPInputContext)
  const val = otp[index] || ""

  return (
    <input
      ref={(el) => {
        inputRefs.current[index] = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      }}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={val}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(index, e)}
      onPaste={onPaste}
      className={cn(
        "w-12 h-14 text-center text-xl font-bold border border-slate-200 rounded-xl focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] focus-visible:outline-none bg-white transition-all",
        className
      )}
      {...props}
    />
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }
