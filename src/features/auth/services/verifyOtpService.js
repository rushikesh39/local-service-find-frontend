import { verifyOtpApi } from "../api/auth"

async function verifyOtpService(data, otp) {
    const payload = { ...data, ...otp }
    const res = await verifyOtpApi(payload)
    return res
}

export default verifyOtpService