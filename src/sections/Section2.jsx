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

      // Floating Top-Right Icon Animation
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

      // Floating Bottom-Left Icon Animation
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

      // Animate image
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

      // Animate headline and paragraph
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

      // Animate each card
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          delay: i * 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // <section
    //   ref={sectionRef}
    //   className="min-h-screen bg-[#F1F6FF] flex flex-col items-center justify-center px-4 py-10 text-center"
    // >
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F1F6FF] flex flex-col items-center justify-center px-4 py-10 text-center"
    >
        {/* Top Right Animation */}
        <img
          ref={topRightRef}
          src={percentIcon}
          alt="Discount"
          className="absolute top-5 right-10 w-16 md:w-40"
        />

        {/* Bottom Left Animation */}
        <img
          ref={bottomLeftRef}
          src={loanApprovedIcon}
          alt="Loan Approved"
          className="absolute bottom-10 left-10 w-20 md:w-40 rotate-[12deg]"
        />
        
        {/* Headline and Description */}
        <div ref={headingRef} className="max-w-4xl mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6bc6a7] mb-4">
            Unlock Loan Offers from 30+ Lenders
          </h2>
          <p className="text-lg md:text-xl text-[#1f1f1f]">
            Apply now for fast approval and flexible payment plans.
          </p>
        </div>

        {/* Animated Image */}
        <div className="mb-2">
          <img
            ref={imageRef}
            src={vendingMachine}
            alt="vending-machine"
            className="w-[240px] md:w-[320px] mx-auto drop-shadow-xl"
          />
        </div>

        {/* Loan Steps */}
        <div className="max-w-5xl w-full grid gap-6 md:grid-cols-3">
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
              desc: 'Get inatant offers from various lenders',
            },
          ].map((item, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-[#6bc6a7] mb-2">{item.title}</h3>
              <p className="text-sm text-[#333]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <button className="mt-10 bg-[#6bc6a7] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#5bb396] transition duration-300">
          Apply for Loan
        </button>
      
    </section>
  );
};

export default Section2;
