import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen pb-14 md:pb-0 font-sans text-slate-900 bg-[#F8FAFC]">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <MobileBottomNav />
        </div>
    );
}

export default PublicLayout;