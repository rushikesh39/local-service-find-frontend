import { verifyOtpApi } from "../api/auth"

async function verifyOtpService(payload) {
    const res = await verifyOtpApi(payload)
    return res
}

export default verifyOtpService