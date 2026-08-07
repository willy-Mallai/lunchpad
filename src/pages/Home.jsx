import { useState } from "react";
import Header from "../features/home/Header";
import Main from "../features/home/Main";
import NavBar from "../features/home/NavBar";

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col h-screen bg-[#EBF0F7] text-[#2E365A] font-sans antialiased overflow-hidden">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <NavBar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <Main />
      </div>
    </div>
  );
}

export default Home;


