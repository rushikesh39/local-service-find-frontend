import { z } from "zod"

const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name should be at list 3 Character")
            .max(30, "Name should not be greater than 30 Character")
            .trim(),
        mobile: z
            .string()
            .regex(/^[6-9]\d{9}$/, "Invalid Mobile No.")
            .optional()
            .or(z.literal("")),
        email: z
            .string()
            .email()
            .trim()
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email")
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

export default registerSchema;