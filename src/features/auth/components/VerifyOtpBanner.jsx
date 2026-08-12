import { useLocation } from "react-router-dom";
function VerifyOtpBanner() {

    const { state } = useLocation();
    const email = state?.email || null;
    const mobile = state?.mobile || null;
    return (
        <div className="hidden bg-[url('register.png')] bg-cover bg-center h-full w-full lg:flex lg:col-span-5 p-8 sm:p-10 flex-col justify-between relative min-h-[640px]">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight mb-3">
                    One Step Closer! <br />
                    <span className="text-[#00897B]">
                        Verify {mobile ? "Your Number" : "Your Email"}
                    </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-sm leading-relaxed mt-2">
                    We've sent a 6-digit OTP to your {mobile ? "mobile number" : "email address"}{" "}
                    <span className="text-[#00897B] font-bold">{mobile || email}</span>
                </p>
            </div>
        </div>
    )
}
export default VerifyOtpBanner