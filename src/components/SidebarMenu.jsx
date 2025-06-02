"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import Logo from "../assets/loan-logo.png";
import { logoutUser } from '../utils/auth';

export default function SidebarMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
  
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full z-50 bg-[#6bc6a7] text-white overflow-hidden shadow-xl">
          <div
            ref={menuRef}
            className="flex flex-col md:flex-row justify-between px-6 py-10 max-w-7xl mx-auto md:items-start items-center text-center md:text-left"
          >
            {/* Left section - Logo & Menu (should stay left) */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white"
              >
                <X size={28} />
              </button>

              <a href="/"><img src={Logo} alt="Logo" className="h-20 mb-4" /></a>
              {!localStorage.getItem('userDetails') ? (
                <>
                  <div className="text-4xl font-bold">
                    <a href="login" className="hover:underline">Login</a>
                  </div>
                  <div className="text-4xl font-bold">
                    <a href="register" className="hover:underline">Registration</a>
                  </div>
                </>
              ) : (
                <div className="text-4xl font-bold">
                  <a onClick={logoutUser} className="hover:underline">Logout</a>
                </div>
              )}
            </div>

            {/* Right section - Contact info + socials */}
            <div className="mt-8 md:mt-0 md:w-1/2 space-y-2 md:space-y-0 text-center md:text-left">
              <p className="text-sm">Reach out to us at:</p>
              <a
                href="mailto:support@test.com"
                className="text-white underline text-sm"
              >
                support@test.com
              </a>
              <p className="text-sm mt-2">We are available here</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-2">
                <a href="#"><i className="fab fa-instagram" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-facebook" /></a>
                <a href="#"><i className="fab fa-linkedin" /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
