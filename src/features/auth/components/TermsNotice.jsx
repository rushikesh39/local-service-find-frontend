import { Link } from "react-router-dom";

function TermsNotice() {
    return (
        <p className="text-[11px] text-center text-slate-400 mt-5 font-medium">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-[#00897B] underline font-semibold">
                Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#00897B] underline font-semibold">
                Privacy Policy
            </Link>
        </p>
    )
}
export default TermsNotice