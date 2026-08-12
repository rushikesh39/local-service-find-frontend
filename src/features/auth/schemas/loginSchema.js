import { z } from "zod"

const loginSchema = z
    .object({
        email: z
            .string()
            .trim()
            .email()
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email")
            .optional()
            .or(z.literal("")),
        mobile: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Invalid Mobile No.")
            .optional()
            .or(z.literal("")),
    })
    .superRefine((data, ctx) => {
        const email = data.email?.trim() || "";
        const mobile = data.mobile?.trim() || "";

        if (!email && !mobile) {
            ctx.addIssue({
                message: "Email is required",
                path: ["email"],
            });

            ctx.addIssue({
                message: "Mobile Number is required",
                path: ["mobile"],
            });
        }
    });

export default loginSchema;