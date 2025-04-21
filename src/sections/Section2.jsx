import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import vendingMachine from '../assets/qr-coin.webp';

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          y: 200,          // ⬅️ More vertical movement
          opacity: 0,
          scale: 0.8,      // ⬅️ Zoom-in effect
          rotate: 10       // ⬅️ Slight rotation
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: 'back.out(1.7)', // ⬅️ Smooth spring-like bounce
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
  
      ScrollTrigger.refresh();
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);
  

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#F1F6FF] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#6bc6a7] mb-4">
          Up to 5% cashback
        </h2>
        <p className="text-xl md:text-2xl text-[#1f1f1f]">
          on every merchant UPI transaction
        </p>
      </div>

      <div className="mt-12">
        <img
          src={vendingMachine}
          alt="vending-machine"
          ref={imageRef}
          className="w-[300px] md:w-[380px] mx-auto drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default Section2;
