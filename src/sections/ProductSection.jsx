import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import product1 from '../assets/product-1.webp';
import product2 from '../assets/product-2.webp';
import useIsDesktop from '../hooks/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

const ProductSection = () => {
  const sectionRef = useRef(null);
  const productRefs = useRef([]);
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const products = [
    {
      title: 'Confirm.Credit',
      subtitle: 'The smarter way to manage credit.',
      category: 'DESIGN',
      image: product1,
      link: '/loan-journey',
    },
    {
      title: 'Confirm.Shop',
      subtitle: 'Shop seamlessly with instant approvals.',
      category: 'MARKETING',
      image: product2,
      link: '/shop',
    },
  ];

  useEffect(() => {
    console.log(productRefs.current);
    if (!isDesktop || productRefs.current.length === 0) return;
      const ctx = gsap.context(() => {

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
            scrub: true,
            pin: true,
            markers: false,
          },
        });

        panels.forEach((panel, index) => {
          const fadeInTime = index * 1;
          const fadeOutTime = index + 0.99;

          timeline.to(panel, {
            autoAlpha: 1,
            yPercent: 0,
            ease: 'power2.out',
          }, fadeInTime);

          if (index !== products.length - 1) {
            timeline.to(panel, {
              autoAlpha: 0,
              yPercent: -10,
              ease: 'power2.inOut',
            }, fadeOutTime);
          }
        });
      }, sectionRef);

      return () => ctx.revert();


    // return () => {
    //   ScrollTrigger.getAll().forEach((st) => st.kill());
    // };
  }, [isDesktop, products.length]);

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Desktop Animation */}
      {isDesktop && (
        <div className="w-full relative h-screen">
          {products.map((product, index) => (
            <div
              key={index}
              // onClick={() => navigate(product.link, { replace: true })}
              ref={(el) => (productRefs.current[index] = el)}
              className="absolute top-0 left-0 w-full h-screen bg-cover bg-center flex items-center justify-start px-6 lg:px-10 text-white transition-opacity duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${product.image})`,
                zIndex: products.length - index,
                backgroundAttachment: 'fixed',
              }}
            >
              <Link to={product.link} target='_blank' key={index}>
                <div className="bg-black/60 p-6 lg:p-8 rounded-2xl max-w-xl">
                  <p className="uppercase text-sm tracking-widest">{product.category}</p>
                  <h2 className="text-4xl lg:text-6xl font-extrabold mt-2">{product.title}</h2>
                  <p className="text-base lg:text-lg mt-4">{product.subtitle}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Static Cards */}
      {!isDesktop && (
        <div className="lg:hidden p-4 pb-8 space-y-6 bg-[#0b0c2a]">
          {products.map((product, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden relative h-60 flex items-end p-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            >
              <Link to={product.link} key={index}>
                  <div className="text-white z-10">
                    <p className="uppercase text-xs font-semibold opacity-80">{product.category}</p>
                    <h2 className="text-2xl font-extrabold leading-tight">{product.title}</h2>
                  </div>
                  <div className="absolute bottom-4 right-4 text-white z-10">
                    <ArrowRight size={24} />
                  </div>
                  <div className="absolute inset-0 bg-black/40" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;