import { getUserDetailsApi } from "../api/auth"

async function getUserDetailsService() {
    const res = await getUserDetailsApi()
    return res
}

export default getUserDetailsService