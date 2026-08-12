import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtpApi, loginApi } from "../api/auth";
import Swal from "sweetalert2";
import {
    MapPin,
    ShieldCheck,
    Zap,
    Lock,
    ChevronDown,
    User,
    Phone,
    Mail,
    Eye,
    EyeOff,
} from "lucide-react";
import SocialLogin from "./SocialLogin";
import OtpNoticeCard from "./OtpNoticeCard";
import TermsNotice from "./TermsNotice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/loginSchema";
import loginUserService from "../services/loginUserService";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm() {
    const navigate = useNavigate();

    const [countryCode, setCountryCode] = useState("+91");
    const [loginMode, setLoginMode] = useState("mobile"); // "mobile" | "email"

    const { register, handleSubmit, setError, formState } = useForm({ resolver: zodResolver(loginSchema) })
    const { errors, isSubmitting } = formState;

    const handleModeChange = (mode) => {
        setLoginMode(mode);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            const res = await loginUserService(data, loginMode);
            if (res.success) {
                // Store OTP timer expiry (30 seconds from now) in localStorage
                localStorage.setItem("otpExpiry", (Date.now() + 30000).toString());

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate("/verify-otp", { state: { ...data } });
            }
        } catch (err) {
            const errors = err.response?.data?.errors;
            Object.entries(errors).forEach(([field, value]) => {
                if (value && typeof value === "string") {
                    setError(field, { type: "server", message: value });
                }
            });

            const errorMessage =
                err.response?.data?.message;

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

    return (
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">

                {/* Header Title */}
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-1.5">
                        Login
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Enter your mobile number or Email to continue
                    </p>
                </div>

                <Tabs value={loginMode} onValueChange={handleModeChange} className="mb-5">
                    <TabsList>
                        <TabsTrigger value="mobile">Mobile Number</TabsTrigger>
                        <TabsTrigger value="email">Email Address</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            <TabsContent value="email" className="mt-4 space-y-4">
                                <Field>
                                    <FieldLabel htmlFor="email-address">Email Address</FieldLabel>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                                        <Input
                                            id="email-address"
                                            type="email"
                                            {...register("email")}
                                            placeholder="Enter your email address"
                                            className="pl-9 h-11 bg-white border-slate-200 focus-visible:ring-[#00897B] text-xs sm:text-sm font-medium rounded-xl"
                                        />
                                    </div>
                                    {errors.email && <FieldError className="text-red-500">{errors.email.message}</FieldError>}
                                </Field>
                            </TabsContent>
                            <TabsContent value="mobile" className="mt-4 space-y-4">
                                {/* Mobile Number Field */}
                                <Field>
                                    <FieldLabel htmlFor="mobile-number">Mobile Number</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-3 h-11 bg-slate-50 text-slate-700 font-medium text-xs rounded-xl border border-slate-200 shrink-0 select-none">
                                            <span>🇮🇳</span>
                                            <span>{countryCode}</span>
                                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                        </div>
                                        <Input
                                            id="mobile-number"
                                            type="tel"
                                            {...register("mobile")}
                                            placeholder="Enter your mobile number"
                                            maxLength={10}
                                            className="h-11 bg-white border-slate-200 focus-visible:ring-[#00897B] text-xs sm:text-sm font-medium rounded-xl"
                                        />
                                    </div>
                                    {errors.mobile && <FieldError className="text-red-500">{errors.mobile.message}</FieldError>}
                                </Field>
                            </TabsContent>

                        </FieldGroup>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00897B]/20 disabled:opacity-50 mt-2 cursor-pointer"
                        >
                            {isSubmitting ? "Sending OTP..." : "Continue"}
                        </Button>
                    </form>
                </Tabs>
                {/* Divider OR */}
                <div className="relative my-5 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        or
                    </span>
                </div>
                <SocialLogin />
                <OtpNoticeCard />
                <TermsNotice />

            </div>
        </div>
    )
}
export default LoginForm