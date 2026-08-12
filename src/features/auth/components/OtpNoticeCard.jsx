import { ShieldCheck } from "lucide-react"

function OtpNoticeCard() {
    return (
        <div className="bg-[#E6F4F1]/70 border border-[#00897B]/20 rounded-2xl p-3.5 flex items-center gap-3 mt-6">
            <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#00897B]">
                We'll send a 6-digit OTP to verify
            </span>
        </div>
    )
}
export default OtpNoticeCard