import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Logo from "../assets/loan-logo.png";
import { Menu } from "lucide-react"; // <-- Hamburger icon

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="p-4 flex justify-between items-center bg-white shadow-md">
        <img src={Logo} alt="Logo" className="h-8-" />

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-md bg-[#6bc6a7] text-white"
        >
          <Menu size={24} />
        </button>
      </nav>

      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}