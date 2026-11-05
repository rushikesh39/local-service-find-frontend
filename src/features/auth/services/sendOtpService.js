import { sendOtpApi } from "../api/auth"

async function sendOtpService(payload) {

    const res = await sendOtpApi(payload)
    return res
}

export default sendOtpService