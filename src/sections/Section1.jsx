import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import percentArrow from "../assets/percent_arrow.png";
import moneyBag from "../assets/money_bag.png";
import rupee from "../assets/rupee.png";
import coinBag from '../assets/coin_bag.png';

gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonRef = useRef();
  const coinRef = useRef();
  const cubeRef = useRef();
  const flagRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        delay: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        delay: 0.4,
        duration: 1,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(coinRef.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(cubeRef.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(flagRef.current, {
        y: 12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen- min-h-[calc(100vh-64px)] bg-[#F1F6FF] text-[#2e3f52] relative overflow-hidden flex flex-col justify-center py-16- py-2 sm:py-24"
    >
      {/* Floating images */}
      <img
        src={moneyBag}
        alt="Coin"
        ref={coinRef}
        className="absolute top-6 sm:top-10 left-4 sm:left-16 w-40 sm:w-36 md:w-48 opacity-70 z-0"
      />
      {/* <img
        src={rupee}
        alt="Notes"
        ref={cubeRef}
        className="absolute bottom-12 sm:bottom-20 right-4 sm:right-16 w-16 sm:w-28 md:w-40 opacity-70 z-0"
      />
      <img
        src={percentArrow}
        alt="Money Stack"
        ref={flagRef}
        className="absolute bottom-10 sm:bottom-20 left-4 sm:left-16 w-14 sm:w-28 md:w-36 opacity-70 z-0"
      /> */}

      {/* Content Wrapper */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Get Easy Loans <br />
        </h1>

        {/* CTA Button */}
        <a
          href="/loan-journey"
          target="_blank"
          rel="noopener noreferrer"
          ref={buttonRef}
          className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#0d6b57] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 font-semibold text-sm sm:text-base md:text-xl"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-8 bg-[#0d6b57] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          Check eligibility
        </a>

        {/* Statistics Section */}
        <div className="mt-12 sm:mt-16 bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center text-[#0b3a2c]">
            <div>
              <div className="flex items-center justify-center mb-2 text-xl sm:text-4xl">⭐</div>
              <div className="text-lg sm:text-2xl font-bold">4.6/5</div>
              <div className="text-xs sm:text-xl opacity-80">1k+ Reviews</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2 text-xl sm:text-5xl">
                <img src={coinBag} alt="Coin Bag" className="w-9 h-9 sm:w-12 sm:h-12" />
              </div>
              <div className="text-lg sm:text-2xl font-bold">₹1000 Cr+</div>
              <div className="text-xs sm:text-xl opacity-80">Loans arranged</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2 text-xl sm:text-4xl">😊</div>
              <div className="text-lg sm:text-2xl font-bold">1 lac+</div>
              <div className="text-xs sm:text-xl opacity-80">Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
