function LoginBanner() {
    return (
        <div className="hidden lg:flex lg:col-span-5 bg-[url('/login.png')] bg-cover bg-center  p-8 sm:p-10 flex-col justify-between relative min-h-[440px]">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight mb-3">
                    Welcome Back! <br />
                    <span className="text-[#0F172A]">Glad to See </span>
                    <span className="text-[#00897B]">You Again</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-sm leading-relaxed">
                    Login to your account and continue finding trusted service professionals.
                </p>
            </div>
        </div>
    )
}
export default LoginBanner