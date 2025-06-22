import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import percentArrow from "../assets/percent_arrow.png";
import moneyBag from "../assets/money_bag.png";
import rupee from "../assets/rupee.png";

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

      // Subtle floating animations
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
      className="min-h-screen bg-[#F1F6FF] bg-[#6bc6a7]- text-white relative overflow-hidden flex flex-col justify-center"
    >
      {/* Floating images */}
      <img
        src={moneyBag}
        alt="Coin"
        ref={coinRef}
        className="absolute top-2 md:top-10 left-16 w-50 md:w-66 opacity-80 bottom-10"
      />
      <img
        src={rupee}
        alt="Notes"
        ref={cubeRef}
        className="absolute bottom-20 right-16 w-32 md:w-40 opacity-80"
      />
      <img
        src={percentArrow}
        alt="Money Stack"
        ref={flagRef}
        className="absolute bottom-20 left-16 w-28 md:w-36 opacity-80"
      />

      {/* Content Wrapper */}
      <div className="w-full max-w-4xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
        >
          Get Easy Loans <br />
        </h1>

        {/* CTA Button */}
        <div
          href="https://confirm.credit"
          target="_blank"
          rel="noopener noreferrer"
          ref={buttonRef}
          className="inline-flex items-center gap-3 bg-white text-[#6bc6a7] px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 font-semibold text-base md:text-lg"

          // className="inline-flex items-center gap-3 bg-white text-[#6bc6a7] px-8 py-4 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 font-semibold text-lg"
        >
          <div className="w-8 h-8 bg-[#6bc6a7] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          Check eligibility
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-3xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-xl font-bold">4.6/5</div>
              <div className="text-sm opacity-80">1k+ Reviews</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-xl font-bold">₹1000 Cr+</div>
              <div className="text-sm opacity-80">Loans arranged</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">😊</span>
              </div>
              <div className="text-xl font-bold">1 lac+</div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;