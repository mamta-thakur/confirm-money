import { useState } from "react";
// import SidebarMenu from "./SidebarMenu";
import SidebarMenu from "./SidebarMenuProducts";
import Logo from "../assets/loan-logo.png";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-[80%] mx-auto py-2 flex justify-between items-center">
          <a href="/">
          {/* <img src={Logo} alt="Logo" className="h-8-" /> */}
          <img src={Logo} alt="Logo" className="h-20 mb-2 md:h-20 w-auto" />
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md bg-[#6bc6a7] text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}