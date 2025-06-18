import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import percentArrow from "../assets/notes-vertical.webp";
import moneyBag from "../assets/money_bag.png";
import cubeLeft from "../assets/note-with-l.webp";

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
        duration: 2,
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
        duration: 2,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(coinRef.current, {
        x: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(cubeRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(flagRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Blob animation
      gsap.utils.toArray(".blob").forEach((blob, i) => {
        gsap.to(blob, {
          y: 30 + i * 5,
          duration: 6 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#6bc6a7] text-white relative overflow-hidden flex flex-col justify-center text-center"
    >
      {/* Animated SVG Blobs */}
      <svg className="blob absolute top-0 left-0 w-72 opacity-20 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M50.5,-68.6C65.5,-60.6,77.4,-44.4,78.8,-28.1C80.1,-11.7,70.9,4.9,61.2,20.5C51.5,36,41.3,50.5,27.3,61.2C13.2,71.8,-4.7,78.5,-21.5,74.2C-38.3,70,-54.1,54.7,-61.2,38.1C-68.3,21.6,-66.8,3.8,-63.2,-13.8C-59.6,-31.5,-53.9,-49.1,-41.3,-58.5C-28.8,-68,-9.4,-69.3,8.4,-72C26.2,-74.7,52.4,-78.6,50.5,-68.6Z" transform="translate(100 100)" />
      </svg>

      <svg className="blob absolute bottom-0 right-0 w-80 opacity-30 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M45.1,-61.1C56.6,-51.2,62.6,-33.6,65.4,-16.3C68.2,1.1,67.8,18.1,61.4,33.3C54.9,48.5,42.5,61.9,27.9,67.6C13.4,73.3,-3.4,71.2,-21.8,66.6C-40.1,61.9,-60,54.7,-67.9,40.9C-75.8,27.2,-71.6,6.9,-63.9,-9.4C-56.2,-25.6,-44.9,-37.9,-32.2,-47.7C-19.5,-57.5,-9.7,-64.8,5.3,-71.1C20.3,-77.4,40.5,-82.1,45.1,-61.1Z" transform="translate(100 100)" />
      </svg>

      {/* Floating images */}
      <img
        src={moneyBag}
        alt="QR Coin"
        ref={coinRef}
        className="absolute top-10 left-10 w-28 md:w-32 rotate-12"
      />
      <img
        src={cubeLeft}
        alt="Cube"
        ref={cubeRef}
        className="absolute bottom-10 left-10 w-38 md:w-46 rotate-45"
      />
      <img
        src={percentArrow}
        alt="Super Flag"
        ref={flagRef}
        className="absolute bottom-10 right-10 w-32 md:w-40"
      />

      {/* Content Wrapper */}
      <div className="w-full max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center">
        <h2 ref={subtitleRef} className="text-lg md:text-xl mb-2">
          Unlock the power of
        </h2>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold bg-white text-[#6bc6a7] px-6 py-2 rounded shadow-lg"
        >
          superUPI
        </h1>
        <p className="text-lg md:text-xl mt-2">crafted for the superYou</p>

        {/* CTA Button */}
        <div
          ref={buttonRef}
          className="mt-8 bg-gradient-to-r from-[#ffffff] to-[#d6f6ed] text-[#2a8c6f] px-6 py-4 rounded-xl shadow-lg cursor-pointer flex items-center gap-4 border border-white hover:scale-105 transition"
        >
          <img
            src={moneyBag}
            alt="QR Code"
            className="w-12 h-12 border-white rounded"
          />
          <span className="text-lg font-semibold">Check eligibility</span>
        </div>
      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-sm md:text-base opacity-90 w-full text-center">
        Get up to 5% guaranteed cashback & many more perks.
      </p>
    </section>
  );
};

export default Section1;
