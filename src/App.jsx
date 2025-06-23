import { useState } from "react";
import Navbar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes/>
      <Footer/>
    </>
  );
}

export default App;
