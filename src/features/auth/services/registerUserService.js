import { registerUserApi } from "../api/auth";

async function registerUserService(formData, regMode) {
    const payload =
        regMode === "mobile"
            ? {
                name: formData.name,
                mobile: formData.mobile,
            }
            : {
                name: formData.name,
                email: formData.email,
            };

    const res = await registerUserApi(payload)
    return res

}
export default registerUserService