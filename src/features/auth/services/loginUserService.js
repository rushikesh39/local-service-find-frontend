import { loginApi } from "../api/auth";

async function loginUserService(formData, loginMode) {
    const payload =
        loginMode === "mobile"
            ? {
                mobile: formData.mobile,
            }
            : {
                email: formData.email,
            };

    const res = await loginApi(payload)
    return res

}
export default loginUserService