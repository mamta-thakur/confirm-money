import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import card1 from '../assets/money_bag.png';
import card2 from '../assets/money_bag.png';
import card3 from '../assets/money_bag.png';
import qrBox from '../assets/money_bag.png';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white px-6 py-20 overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#5B4DFF]">
          The UPI party
        </h2>
        <p className="text-xl mt-2 text-gray-700">has only begun. Stay tuned...</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="bg-[#4B32FF] text-white rounded-2xl p-6 flex-1 max-w-md"
        >
          <h3 className="text-2xl font-bold mb-2">Enjoy partner privileges</h3>
          <p className="mb-4 text-sm">
            Special perks & privileges for you with our online & offline partners!
          </p>
          <img src={card1} alt="Privileges" className="rounded-xl" />
        </div>

        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="bg-[#B9F4C7] text-black rounded-2xl p-6 flex-1 max-w-md"
        >
          <h3 className="text-2xl font-bold mb-2">Hit the super jackpot</h3>
          <p className="mb-4 text-sm">
            From super bikes to flight tickets, win weekly super rewards!
          </p>
          <img src={card2} alt="Jackpot" className="rounded-xl" />
        </div>

        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="bg-[#F53AD3] text-white rounded-2xl p-6 flex-1 max-w-md"
        >
          <h3 className="text-2xl font-bold mb-2">Gift your friend</h3>
          <p className="mb-4 text-sm">
            A friend in greed is a friend indeed! Gift a meme along with money to your friend!
          </p>
          <img src={card3} alt="Memes" className="rounded-xl" />
        </div>
      </div>

      {/* Floating QR */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl absolute bottom-10 right-10 shadow-xl z-20">
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

export default Section5;

