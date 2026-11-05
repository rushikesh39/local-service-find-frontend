import { Card } from "@/components/ui/card";
import VerifyOtpBanner from "../components/VerifyOtpBanner";
import VerifyOtpForm from "../components/VerifyOtpForm";
import FeatureCards from "../components/FeatureCards";

const VerifyOtp = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 px-4 sm:px-6 flex flex-col justify-between font-sans">
      <Card className="max-w-6xl mx-auto w-full border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-8 p-0 gap-0 shadow-xl shadow-slate-200/60 rounded-3xl">
        <VerifyOtpBanner />
        <VerifyOtpForm />
      </Card>
      <FeatureCards />
    </div>
  );
};

export default VerifyOtp;
