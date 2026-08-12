import Navbar from "./components/layout/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";

function App() {
  return (
    <div className="flex flex-col min-h-screen pb-14 md:pb-0 font-sans text-slate-900 bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default App;
