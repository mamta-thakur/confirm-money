import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import superFlag from "../assets/notes-vertical.webp";
import qrCoin from "../assets/qr-coin.webp";
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

      // Animate each image separately
      gsap.from(coinRef.current, {
        opacity: 0,
        x: 90,
        duration: 2,
        scrollTrigger: {
          trigger: coinRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.from(cubeRef.current, {
        // opacity: 0,
        y: 50,
        duration: 2,
        // delay: 0.2,
        scrollTrigger: {
          trigger: cubeRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.from(flagRef.current, {
        opacity: 0,
        y: 80,
        duration: 2,
        delay: 0.4,
        scrollTrigger: {
          trigger: flagRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
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
      className="min-h-screen bg-[#6bc6a7] text-white relative overflow-hidden flex flex-col justify-center text-center"
    >
      {/* Floating images */}
      <img
        src={qrCoin}
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
        src={superFlag}
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
          className="text-5xl md:text-7xl font-bold bg-white text-[#6bc6a7] px-6 py-2 rounded"
        >
          superUPI
        </h1>
        <p className="text-lg md:text-xl mt-2">crafted for the superYou</p>

        {/* CTA Button */}
        <div
          ref={buttonRef}
          className="mt-8 bg-gradient-to-r to-indigo-600 p-4 rounded-xl shadow-lg cursor-pointer flex items-center gap-4 border"
        >
          <img
            src={qrCoin}
            alt="QR Code"
            className="w-12 h-12 border-white rounded"
          />
          <span className="text-lg font-medium">Check eligibility</span>
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
