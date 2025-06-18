import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import posImage from '../assets/qr-coin-color-red.webp';
import qrGlow from '../assets/decor-l-2.webp';
import qrBox from '../assets/money_bag.png';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const posRef = useRef(null);
  const qrGlowRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features animation
      featuresRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#6bc6a7] text-white px-6 py-10 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="w-4/5- mb-10- max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text */}
        <div className="md:w-1/2- mb-12 md:mb-0 z-10 text-center md:text-left">
          
          <h3 className="text-2xl md:text-3xl font-bold mt-2 text-[#000e18]">
            Shop What You Love.<br></br>
            Pay How You Like.<br></br>
            Only with Confirm.<br></br>
          </h3>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mt-2 text-[#000e18]">How to use Confirm.Shop?</h3>
      <div className="max-w-screen-xl- mx-auto- grid- grid-cols-1- md:grid-cols-3- gap-10- 
      w-full max-w-screen-lg mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1. At Checkout */}
        <div className="text-center md:text-left">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-xl font-bold mb-2">At checkout</h3>
          <p className="text-sm mb-2">
            Look for the Affirm logo when completing your purchase, or pay with your{' '}
            <a href="#" className="text-blue-600 underline">Affirm Card</a>.
          </p>
        </div>

        {/* 2. Affirm App */}
        <div className="text-center md:text-left">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Affirm app</h3>
          <p className="text-sm mb-4">
            Check your purchasing power and see your payment options from the palm of your hand.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm mb-2">Learn more</button>
        </div>

        {/* 3. The Affirm Card */}
        <div className="text-center md:text-left">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">The Affirm Card™</h3>
          <p className="text-sm mb-2">
            Request to pay over time for the big stuff, or just pay in full for the smaller things.
          </p>
        </div>
      </div>

      {/* Dummy Features Section */}
      <div className="w-full max-w-screen-lg mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {['Instant Payments', 'Secure Transactions', '24/7 Support'].map((feature, index) => ( */}
          <>
          <div
            className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-md text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Get Deals</h3>
            <p className="text-sm text-white/80">
              on your favourite brands<br></br> At Checkout
            </p>
          </div>
          <div
          className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-md text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Get Financing</h3>
          <p className="text-sm text-white/80">
            Explore payment options <br></br>on real time
          </p>
        </div>
        <div
        className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-md text-center"
      >
        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
        <p className="text-sm text-white/80">
          Get help and answers to <br></br>questions in real time
        </p>
      </div>
      </>
        {/* ))} */}
      </div>

      {/* Floating QR Widget */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md rounded-xl absolute bottom-10 right-10 z-20">
        <img src={qrBox} alt="QR Box" className="w-12 h-12" />
        <span className="text-white text-sm">
          Check
          <br />
          eligibility
        </span>
      </div>
    </section>
  );
};

export default Section3;
