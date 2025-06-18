import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import phoneMockup from '../assets/super-deposit.webp';
import qrBox from '../assets/money_bag.png';

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
      className="relative min-h-[80vh] bg-white px-4 sm:px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Left: Phone Image */}
      <div ref={phoneRef} className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src={phoneMockup}
          alt="SuperUPI Phone"
          className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] drop-shadow-2xl"
        />
      </div>

      {/* Right: Text Content */}
      <div className="md:w-1/2 text-center md:text-left z-10 space-y-4">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7A6BFF]"
        >
          superUPI
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl font-medium text-gray-800"
        >
          simple yet powerful
        </p>
        <p
          ref={descRef}
          className="text-gray-600 max-w-md mx-auto md:mx-0"
        >
          Get up to 5% cashback and many more perks on every single transaction through superUPI.
        </p>
        <ul className="text-gray-500 text-sm sm:text-base list-disc list-inside mt-2 max-w-md mx-auto md:mx-0">
          <li>No hidden charges</li>
          <li>Seamless transaction flow</li>
          <li>24/7 Customer Support</li>
          <li>Works with all major banks</li>
        </ul>
      </div>

      {/* Floating QR Widget */}
      <div
        ref={qrRef}
        className="hidden md:flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl absolute bottom-6 right-6 shadow-xl z-20"
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
