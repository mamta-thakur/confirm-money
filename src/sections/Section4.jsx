import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import phoneMockup from '../assets/super-deposit.webp';
import qrBox from '../assets/qr-coin.webp';

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phone image animation
      gsap.from(phoneRef.current, {
        opacity: 0,
        x: -100,
        rotate: -10,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Description animation
      gsap.from(descRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // QR box floating up
      gsap.from(qrRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Optional: Fade out whole section as it leaves
      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom-=100 top',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          scrub: true,
        },
      });
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
      <div className="md:w-1/2 text-center md:text-left z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-[#7A6BFF]"
        >
          superUPI
        </h2>
        <p
          ref={subtitleRef}
          className="text-xl font-medium text-gray-800 mt-2"
        >
          simple yet powerful
        </p>
        <p
          ref={descRef}
          className="text-gray-500 mt-4 max-w-md"
        >
          Get up to 5% cashback & many more perks on every single transaction through superUPI
        </p>
      </div>

      {/* Floating QR Widget */}
      <div
        ref={qrRef}
        className="hidden md:flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl absolute bottom-10 right-10 shadow-xl z-20"
      >
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
