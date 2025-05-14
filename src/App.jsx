import { useState } from "react";
import Navbar from "./components/NavBar";
import AppRoutes from "./Routes/AppRoutes";
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
