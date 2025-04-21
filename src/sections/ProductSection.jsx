import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import product1 from '../assets/product-1.webp';
import product2 from '../assets/product-2.webp';
import useIsDesktop from '../hooks/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

const ProductSection = () => {
  const sectionRef = useRef(null);
  const productRefs = useRef([]);
  const isDesktop = useIsDesktop();

  const products = [
    {
      title: 'Confirm.Credit',
      subtitle: 'The smarter way to manage credit.',
      image: product1,
    },
    {
      title: 'Confirm.Shop',
      subtitle: 'Shop seamlessly with instant approvals.',
      image: product2,
    },
  ];

  useEffect(() => {
    if (!isDesktop || productRefs.current.length === 0) return;

    const panels = productRefs.current;

    panels.forEach((panel, index) => {
      gsap.set(panel, {
        autoAlpha: index === 0 ? 1 : 0,
        yPercent: index === 0 ? 0 : 10,
        zIndex: products.length - index,
      });
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * (products.length - 1)}`,
        // scrub: true,
        scrub: true,
        pin: true,
        markers: false,
        // anticipatePin: 1,
      },
    });

    panels.forEach((panel, index) => {
      const fadeInTime = index * 1;
      const fadeOutTime = (index + 0.99);

      // Fade in
      timeline.to(panel, {
        autoAlpha: 1,
        yPercent: 0,
        ease: 'power2.out',
      }, fadeInTime);

      // Fade out
      if (index !== products.length - 1) {
        timeline.to(panel, {
          autoAlpha: 0,
          yPercent: -10,
          ease: 'power2.inOut',
        }, fadeOutTime);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isDesktop, products.length]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden min-h-screen">
      <div className="w-full relative h-screen">
        {products.map((product, index) => (
          <div
            key={index}
            ref={(el) => (productRefs.current[index] = el)}
            className={`
              absolute top-0 left-0 w-full h-screen
              bg-cover bg-center flex items-center justify-start px-6 lg:px-10
              text-white transition-opacity duration-500 ease-in-out
            `}
            style={{
              backgroundImage: `url(${product.image})`,
              zIndex: products.length - index,
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="bg-black/60 p-6 lg:p-8 rounded-2xl max-w-xl">
              <p className="uppercase text-sm tracking-widest">Design</p>
              <h2 className="text-4xl lg:text-6xl font-extrabold mt-2">{product.title}</h2>
              <p className="text-base lg:text-lg mt-4">{product.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
