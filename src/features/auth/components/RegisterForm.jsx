import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    ShieldCheck,
    ChevronDown,
    User,
    Mail,
} from "lucide-react";
import registerSchema from "../schemas/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import registerUserService from "../services/registerUserService";
import SocialLogin from "./SocialLogin";

function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState,
    } = useForm({ resolver: zodResolver(registerSchema) });
    const { errors, isSubmitting } = formState;
    const navigate = useNavigate();

    const [regMode, setRegMode] = useState("mobile"); // "mobile" | "email"
    const [countryCode, setCountryCode] = useState("+91");

    const handleModeChange = (mode) => {
        setRegMode(mode);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            const res = await registerUserService(data, regMode)

            if (res.success) {
                // Store OTP timer expiry (30 seconds from now) in localStorage
                localStorage.setItem("otpExpiry", (Date.now() + 30000).toString());

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: res?.message,
                    showConfirmButton: false,
                    timer: 2000,
                });

                navigate("/verify-otp", {
                    state: { ...data, purpose: "register" },
                });
            }
        } catch (err) {
            console.log(err)
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
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
                {/* Header Title */}
                <div className="mb-5">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-1.5">
                        Create Account
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Enter your details to get started
                    </p>
                </div>
                {/* Registration Mode Toggle Tabs using Shadcn Tabs */}
                <Tabs value={regMode} onValueChange={handleModeChange} className="mb-5">
                    <TabsList>
                        <TabsTrigger value="mobile">Mobile Number</TabsTrigger>
                        <TabsTrigger value="email">Email Address</TabsTrigger>
                    </TabsList>

                    {/* MOBILE REGISTRATION FORM */}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            {/* Full Name Field */}
                            <Field>
                                <FieldLabel htmlFor="mobile-name">Full Name</FieldLabel>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                                    <Input
                                        id="mobile-name"
                                        type="text"
                                        {...register("name")}
                                        placeholder="Enter your full name"
                                        className="pl-9 h-11 bg-white border-slate-200 focus-visible:ring-[#00897B] text-xs sm:text-sm font-medium rounded-xl"
                                    />
                                </div>
                                {errors.name && <FieldError className=" text-red-500">{errors.name.message}</FieldError>}
                            </Field>
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

                        {/* Action Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00897B]/20 disabled:opacity-50 mt-2 cursor-pointer"
                        >
                            {isSubmitting ? "Sending OTP..." : "Continue"}
                        </Button>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-3 text-center">Already have an account? <Link to="/login" className="text-[#00897B] cursor-pointer">Login</Link></p>
                    </form>
                </Tabs>

                {/* Divider OR using Shadcn Separator */}
                <div className="relative my-5 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        or
                    </span>
                </div>

                {/* Social Logins using Shadcn Button */}
                <SocialLogin />

                {/* OTP Notice Card */}
                <div className="bg-[#E6F4F1]/70 border border-[#00897B]/20 rounded-2xl p-3.5 flex items-center gap-3 mt-6">
                    <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#00897B]">
                        {regMode === "mobile"
                            ? "We'll send a 6-digit OTP to verify your number"
                            : "We'll send a verification link/code to your email"}
                    </span>
                </div>

                {/* Terms Legal Note */}
                <p className="text-[11px] text-center text-slate-400 mt-5 font-medium">
                    By continuing, you agree to our{" "}
                    <Link to="/terms" className="text-[#00897B] underline font-semibold">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#00897B] underline font-semibold">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm