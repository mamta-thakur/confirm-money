import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Image imports
import posImage from '../assets/qr-coin-color-red.webp';
import qrGlow from '../assets/decor-l-2.webp';
import qrBox from '../assets/qr-coin.webp';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const posRef = useRef(null);
  const qrGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        posRef.current,
        { opacity: 0, x: 200, rotate: 15, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: 1.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );

      gsap.to(qrGlowRef.current, {
        y: 80,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#6bc6a7] text-white px-6 py-20 overflow-hidden flex items-center justify-center"
    >
      <div className="w-4/5 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text */}
        <div className="md:w-1/2 mb-12 md:mb-0 z-10 text-center md:text-left">
          <p className="text-lg md:text-xl text-white/80">
            Redefining the way you
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mt-2">Scan and pay</h2>
        </div>

        {/* POS + QR Glow */}
        <div className="relative md:w-1/2 flex justify-center z-10">
          <img
            src={posImage}
            alt="POS Machine"
            ref={posRef}
            className="w-[260px] md:w-[340px] drop-shadow-2xl"
          />
          <img
            src={qrGlow}
            alt="QR Glow"
            ref={qrGlowRef}
            className="absolute top-[30%] left-[10%] w-[120px] md:w-[140px] pointer-events-none opacity-90"
          />
        </div>
      </div>

      {/* Floating QR Widget */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md rounded-xl absolute bottom-10 right-10 z-20">
        <img src={qrBox} alt="QR Box" className="w-12 h-12" />
        <span className="text-white text-sm">
          Check
          <br />
          eligibility
        </span>
      </div>
    </section>
  );
};

export default Section3;
