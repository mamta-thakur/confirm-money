import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Smartphone, CreditCard, Gift, DollarSign, Headphones } from 'lucide-react';

import posImage from '../assets/qr-coin-color-red.webp';
import qrGlow from '../assets/decor-l-2.webp';
import qrBox from '../assets/money_bag.png';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const stepsRef = useRef([]);
  const featuresRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      stepsRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Features animation
      featuresRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40, rotationY: 45 },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
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
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: ShoppingCart,
      title: "At checkout",
      description: "Look for the Affirm logo when completing your purchase, or pay with your",
      linkText: "Affirm Card",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: Smartphone,
      title: "Affirm app",
      description: "Check your purchasing power and see your payment options from the palm of your hand.",
      hasButton: true,
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: CreditCard,
      title: "The Affirm Card™",
      description: "Request to pay over time for the big stuff, or just pay in full for the smaller things.",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const features = [
    {
      icon: Gift,
      title: "Get Deals",
      description: "on your favourite brands At Checkout",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: DollarSign,
      title: "Get Financing",
      description: "Explore payment options on real time",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help and answers to questions in real time",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br bg-[#6bc6a7] from-[#4ade80]- via-[#22c55e] to-[#16a34a] text-white px-6 py-10 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-10">
          {/* <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div> */}
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Shop What You Love.
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-100 to-white bg-clip-text text-transparent">
              Pay How You Like.
            </span>
            <br />
            <span className="text-[#000e18] font-extrabold">
              Only with Confirm.
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-white/50 to-transparent mx-auto mb-8"></div>
        </div>

        {/* How to use section */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-[#000e18] mb-6">
            How to use Confirm.Shop?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  ref={el => stepsRef.current[index] = el}
                  className="group relative"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 h-full border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
                    {/* Icon with gradient background */}
                    <div className={`w-10 h-10 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform duration-500`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <h4 className="text-2xl font-bold mb-1 text-white group-hover:text-green-100 transition-colors duration-300">
                      {step.title}
                    </h4>
                    
                    <p className="text-white/80 leading-relaxed mb-4">
                      {step.description}
                      {step.linkText && (
                        <span className="text-green-200 underline hover:text-white cursor-pointer transition-colors duration-300">
                          {' '}{step.linkText}
                        </span>
                      )}
                    </p>
                    
                    {step.hasButton && (
                      <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        Learn more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="group relative"
              >
                <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl">
                  {/* Gradient background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-6 transition-transform duration-500`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-bold mb-1 text-white group-hover:text-green-100 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Floating QR Widget */}
      {/* <div className="hidden lg:flex items-center gap-4 px-6 py-4 bg-white/15 backdrop-blur-lg rounded-2xl absolute bottom-10 right-10 z-20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer">
        <div className="relative">
          <img src={qrBox} alt="QR Box" className="w-14 h-14 group-hover:rotate-12 transition-transform duration-500" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <span className="text-white font-semibold block">Check</span>
          <span className="text-green-200 text-sm">eligibility</span>
        </div>
      </div> */}

      {/* Mobile floating button */}
      {/* <div className="lg:hidden fixed bottom-6 right-6 z-20">
        <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div> */}
    </section>
  );
};

export default Section3;