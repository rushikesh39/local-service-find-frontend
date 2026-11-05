import { logoutApi } from "../api/auth"

async function logoutService() {
    const res = await logoutApi()
    return res
}

export default logoutService