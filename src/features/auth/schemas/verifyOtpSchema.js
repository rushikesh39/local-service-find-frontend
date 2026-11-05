import { z } from "zod";

const verifyOtpSchema = z.object({
    otp: z.string().trim().min(6, "Invalid OTP")
})
export default verifyOtpSchema;