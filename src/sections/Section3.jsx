import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, IndianRupee, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     cardsRef.current.forEach((el, i) => {
  //       gsap.fromTo(
  //         el,
  //         { opacity: 0, y: 40, scale: 0.95 },
  //         {
  //           opacity: 1,
  //           y: 0,
  //           scale: 1,
  //           duration: 0.8,
  //           delay: i * 0.2,
  //           ease: 'back.out(1.7)',
  //           scrollTrigger: {
  //             trigger: el,
  //             start: 'top 85%',
  //             toggleActions: 'play none none reverse',
  //           },
  //         }
  //       );
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  const boxes = [
    {
      icon: ShoppingCart,
      title: 'At checkout',
      description: 'Look for the Affirm logo when completing your purchase, or pay with your Affirm Card.',
      gradient: 'from-teal-400 to-emerald-500',
    },
    {
      icon: IndianRupee,
      title: 'Get Financing',
      description: 'Explore payment options on real time.',
      gradient: 'from-cyan-400 to-indigo-500',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help and answers to questions in real time',
      gradient: 'from-green-400 to-emerald-600',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] bg-[#6bc6a7] text-white px-6 sm:px-12 py-6 sm:py-16 md:py-18 lg:py-20"
    >
      <div className="max-w-7xl mx-auto lg:mt-20">
        {/* Heading */}
        <div className="mb-4 md:mb-8 sm:mb-12 md:mb-16 text-left">
          <h2 className="text-2xl sm:text-5xl md:text-3xl font-bold leading-tight mb-1 sm:mb-2 md:mb-3">
            <span className="text-white">Shop What You Love.</span><br />
            <span className="text-white">Pay How You Like.</span><br />
            {/* <span className="font-extrabold text-white">Only with Confirm.</span> */}
          </h2>
          <h3 className="text-lg sm:text-2xl font-semibold mt-0 sm:mt-4 md:mt-4">
            How to use Confirm.Shop?
          </h3>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-3">
          {boxes.map((box, index) => {
            const Icon = box.icon;
            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="bg-white/10 p-2 sm:p-8 rounded-2xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className={`w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r ${box.gradient} rounded-xl flex items-center justify-center mb-0 sm:mb-4 md:mb-4`}>
                  <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-0 sm:mb-2 md:mb-2">{box.title}</h4>
                <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed">{box.description}</p>
              </div>
            );
          })}
        </div>

        {/* Shop Now Button */}
        <div className="mt-8 sm:mt-14 md:mt-16 text-left">
          <a
            href="/shop"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#6bc6a7] px-6 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:bg-green-100 transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section3;
