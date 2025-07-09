import { useState } from "react";
import SidebarMenu from "./SidebarMenuProducts";
import Logo from "../assets/loan-logo.png";
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';

export default function NavbarProducts() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md border-b-2 border-green-500">
        <div className="w-[90%] mx-auto pt-2 pb-4 flex justify-between items-center">
          <Link to="/">
          <img src={Logo} alt="Logo" className="h-20 md:h-20 w-auto" />
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2- rounded-md bg-green-500- text-black"
          >
            <Menu size={40} />
          </button>
        </div>
      </nav>

      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}