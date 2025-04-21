import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Image imports
import phoneMockup from '../assets/super-deposit.webp';
import qrBox from '../assets/qr-coin.webp';

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate phone
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, x: -150, rotate: -5 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );

      // Animate text content
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white px-6 py-20 flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Left: Phone Image */}
      <div ref={phoneRef} className="md:w-1/2 flex justify-center mb-12 md:mb-0">
        <img
          src={phoneMockup}
          alt="SuperUPI Phone"
          className="w-[660px] md:w-[740px] drop-shadow-2xl"
        />
      </div>

      {/* Right: Text Content */}
      <div ref={textRef} className="md:w-1/2 text-center md:text-left z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#7A6BFF]">superUPI</h2>
        <p className="text-xl font-medium text-gray-800 mt-2">simple yet powerful</p>
        <p className="text-gray-500 mt-4 max-w-md">
          Get up to 5% cashback & many more perks on every single transaction through superUPI
        </p>
      </div>

      {/* Floating QR Widget */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl absolute bottom-10 right-10 shadow-xl z-20">
        <img src={qrBox} alt="QR Box" className="w-10 h-10" />
        <span className="text-sm leading-tight">
          Check
          <br />
          eligibility
        </span>
      </div>
    </section>
  );
};

export default Section4;
