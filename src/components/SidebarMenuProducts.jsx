"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { Link } from 'react-router-dom';
import Logo from "../assets/loan-logo.png";
import { logoutUser } from '../utils/auth';

export default function SidebarMenuProducts({ isOpen, onClose }) {
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
        <div className="fixed top-0 left-0 w-full z-50 bg-green-500- bg-white text-white overflow-hidden shadow-xl">
          <div
            ref={menuRef}
            className="flex flex-col md:flex-row justify-between px-6 py-10 max-w-7xl mx-auto md:items-start items-center text-center md:text-left"
          >
            {/* Left section - Logo & Menu (should stay left) */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-4">
              <button
                onClick={onClose}
                className="absolute top-7 right-8 text-black"
              >
                <X size={40} />
              </button>

              <Link to="/">
                <img src={Logo} alt="Logo" className="h-20 mb-4" />
              </Link>
              {/* {localStorage.getItem('userDetails') || localStorage.getItem('isAuthenticated')? ( */}
              {(localStorage.getItem('userDetails') || localStorage.getItem('isAuthenticated')) ? (() => {
                const user = JSON.parse(localStorage.getItem('userDetails') || '{}');
                const isSpecialUser = user?.mobile_number === '9459120428';
                <>
                  <div className="text-l font-bold text-black">
                    <Link to="/" className="hover:underline">Home</Link>
                  </div>
                  <div className="text-l font-bold text-black">
                    <Link to="/loan-journey" className="hover:underline">Confirm.Credit</Link>
                  </div>
                  <div className="text-l font-bold text-black">
                    <Link to="/shop" className="hover:underline">Confirm.Shop</Link>
                  </div>

                  {isSpecialUser && (
                    <>
                      <div className="text-l font-bold text-black">
                        <Link to="/admin121/users" className="hover:underline">Users List</Link>
                      </div>
                      <div className="text-l font-bold text-black">
                        <Link to="/admin121/offers" className="hover:underline">Offers List</Link>
                      </div>
                    </>
                  )}

                  <div className="text-l font-bold text-black">
                    <Link to="/" onClick={logoutUser} className="hover:underline">Logout</Link>
                  </div>
                </>
              })() : (              
              // ) : (
                <>
                  <div className="text-l font-bold text-black">
                    <Link to="/" className="hover:underline">Home</Link>
                  </div>
                  <div className="text-l font-bold text-black">
                    <Link to="/loan-journey" className="hover:underline">Confirm.Credit</Link>
                  </div>
                  <div className="text-l font-bold text-black">
                    <Link to="/shop" className="hover:underline">Confirm.Shop</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
