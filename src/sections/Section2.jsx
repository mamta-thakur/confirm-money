import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import vendingMachine from '../assets/coin_bag.png';
import percentIcon from '../assets/percent_arrow.png';
import loanApprovedIcon from '../assets/loan-approved.png';

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating icons
      gsap.fromTo(
        topRightRef.current,
        { y: -10 },
        {
          opacity: 0.5,
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: "power1.inOut",
        }
      );

      gsap.fromTo(
        bottomLeftRef.current,
        { y: -10 },
        {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { y: 200, opacity: 0, scale: 0.8, rotate: 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards
      // cardsRef.current.forEach((card, i) => {
      //   gsap.from(card, {
      //     y: 50,
      //     opacity: 0,
      //     delay: i * 0.2,
      //     duration: 0.8,
      //     ease: 'power2.out',
      //     scrollTrigger: {
      //       trigger: card,
      //       start: 'top 90%',
      //       toggleActions: 'play none none reverse',
      //     },
      //   });
      // });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] bg-[#F1F6FF] flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center"
    >
      {/* Top Right Icon */}
      {/* <img
        ref={topRightRef}
        src={percentIcon}
        alt="Discount Icon"
        className="absolute top-4 sm:top-8 right-4 sm:right-10 w-12 sm:w-20 md:w-36 opacity-80"
      /> */}

      {/* Bottom Left Icon */}
      {/* <img
        ref={bottomLeftRef}
        src={loanApprovedIcon}
        alt="Loan Approved"
        className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 w-14 sm:w-24 md:w-36 rotate-[12deg] opacity-80"
      /> */}

      {/* Headline */}
      <div ref={headingRef} className="max-w-4xl mb-4 sm:mb-6 px-2">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#6bc6a7] mb-3">
          Unlock Loan Offers from 30+ Lenders
        </h2>
        <p className="text-xs sm:text-sm- sm:text-lg md:text-xl text-[#1f1f1f]">
          Apply now for fast approval and flexible payment plans.
        </p>
      </div>

      {/* Animated Image */}
      <div className="mb-6 sm:mb-10">
        <img
          ref={imageRef}
          src={vendingMachine}
          alt="Vending Machine"
          className="w-44- w-20 sm:w-60 md:w-60 mx-auto drop-shadow-xl"
        />
      </div>

      {/* Loan Steps Cards */}
      <div className="max-w-7xl w-full grid gap-6 px-2 md:grid-cols-3">
        {[
          {
            title: 'Step 1: Register',
            desc: 'Mobile Number & OTP',
          },
          {
            title: 'Step 2: Share Details',
            desc: 'Fill a simple form about your details',
          },
          {
            title: 'Step 3: Get Eligible Offers',
            desc: 'Get instant offers from various lenders',
          },
        ].map((item, index) => (
          <div
            key={index}
            ref={el => (cardsRef.current[index] = el)}
            className="bg-white p-2 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-base sm:text-xl md:text-l lg:text-2xl font-semibold text-[#6bc6a7] mb-1">{item.title}</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#333]">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className="mt-6 sm:mt-14 bg-[#6bc6a7] text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-sm sm:text-lg md:text-xl font-semibold hover:bg-[#5bb396] transition duration-300">
        <a href="/loan-journey">Apply for Loan</a>
      </button>
    </section>
  );
};

export default Section2;
