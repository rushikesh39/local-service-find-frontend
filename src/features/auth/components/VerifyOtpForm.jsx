import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyOtpSchema from "../schemas/verifyOtpSchema";
import verifyOtpService from "../services/verifyOtpService";
import sendOtpService from "../services/sendOtpService";
import getUserDetailsService from "../services/getUserDetails";
import { setUser } from "../../../store/userSlice";
import Swal from "sweetalert2";
import {
    ChevronLeft,
    Mail,
    Phone,
    Lock,
} from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";

function VerifyOtpForm() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getInitialTimer = () => {
        const expiry = localStorage.getItem("otpExpiry");
        if (expiry) {
            const remaining = Math.max(0, Math.ceil((Number(expiry) - Date.now()) / 1000));
            return remaining;
        }
        return 30;
    };

    const [message, setMessage] = useState("");
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(getInitialTimer);

    const email = state?.email || null;
    const mobile = state?.mobile || null;
    const purpose = state?.purpose || null;

    const { control, handleSubmit, setError, setValue, formState } = useForm({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            email: email || "",
            mobile: mobile || "",
            otp: "",
            purpose: purpose || "login"
        }
    });

    const onError = (errors) => {
        console.log("VerifyOtpForm Validation Errors:", errors);
    };

    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (!email && !mobile) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Invalid OTP session. Please Register first.",
            });
            navigate("/register");
        }
    }, [email, mobile, navigate]);

    // Countdown timer
    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Verify OTP
    const onSubmit = async (data) => {

        console.log("onsubmit")
        try {
            const res = await verifyOtpService(state, data);
            if (res.success) {
                localStorage.removeItem("otpExpiry");

                await Swal.fire({
                    icon: "success",
                    title: "Verified!",
                    text: res.message,
                    timer: 2000,
                    showConfirmButton: false,
                });
                const userDetails = await getUserDetailsService();
                dispatch(setUser(userDetails.data));
                navigate("/");
            }
        } catch (err) {
            setValue("otp", "");
            const apiErrors = err.response?.data?.errors;
            if (apiErrors) {
                Object.entries(apiErrors).forEach(([field, value]) => {
                    if (value && typeof value === "string") {
                        setError(field, { type: "server", message: value });
                    }
                });
            }
            const errorMessage = err.response?.data?.message;
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        setResending(true);
        setMessage("");

        try {
            await sendOtpService(state);
            setMessage("OTP has been resent!");
            setValue("otp", "");

            // Save expiry to localStorage (30 seconds from now)
            const expiryTime = Date.now() + 30000;
            localStorage.setItem("otpExpiry", expiryTime.toString());
            setTimer(30);
        } catch (err) {
            const errorMessage = err.response?.data?.message;
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
                {/* Back Button */}
                <div className="mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-xl border-slate-200 hover:bg-slate-50 cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                </div>

                {/* Header Title */}
                <div className="mb-5">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-1.5">
                        Verify OTP
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Enter the 6-digit code sent to
                    </p>
                </div>

                {/* Destination Pill Badge */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-6">
                    <div className="flex items-center gap-2">
                        {mobile ? (
                            <Phone className="w-4 h-4 text-[#00897B]" />
                        ) : (
                            <Mail className="w-4 h-4 text-[#00897B]" />
                        )}
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                            {mobile || email}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-xs font-bold text-[#00897B] hover:underline cursor-pointer"
                    >
                        Change
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
                    {message && <p className="text-[#00897B] text-xs font-medium">{message}</p>}

                    {/* OTP Digits input using Shadcn InputOTP */}
                    <Field>
                        <Controller
                            control={control}
                            name="otp"
                            render={({ field }) => (
                                <InputOTP
                                    value={field.value}
                                    onChange={(val) => {
                                        field.onChange(val);
                                    }}
                                    maxLength={6}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />
                        {errors.otp && <FieldError className="text-red-500 text-center">{errors.otp.message}</FieldError>}
                    </Field>

                    {/* Resend Code Info */}
                    <div className="text-center text-xs sm:text-sm text-slate-500">
                        <span>Didn't receive the code? </span>
                        {timer > 0 ? (
                            <span className="font-semibold">
                                Resend OTP in <span className="text-[#00897B]">00:{timer.toString().padStart(2, "0")}</span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resending}
                                className="font-bold text-[#00897B] hover:underline focus:outline-none cursor-pointer"
                            >
                                {resending ? "Resending..." : "Resend OTP"}
                            </button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00897B]/20 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? "Verifying..." : "Verify"}
                    </Button>
                </form>

                {/* Bottom secure badge */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium mt-6">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Your information is safe and secure</span>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtpForm;