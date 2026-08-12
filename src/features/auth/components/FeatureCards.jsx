import { Card } from "@/components/ui/card"
import { ShieldCheck, Zap, Lock } from "lucide-react"

function FeatureCards() {
    return (
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-row items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#00897B] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">100% Verified</div>
                    <div className="text-[11px] text-slate-500 font-medium">All professionals are background verified</div>
                </div>
            </Card>

            <Card className="rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-row items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Instant Booking</div>
                    <div className="text-[11px] text-slate-500 font-medium">Book services in just a few clicks</div>
                </div>
            </Card>

            <Card className="rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-row items-center gap-3 bg-white">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Secure Payments</div>
                    <div className="text-[11px] text-slate-500 font-medium">Your payments are safe and encrypted</div>
                </div>
            </Card>
        </div>
    )
}
export default FeatureCards