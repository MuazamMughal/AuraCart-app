"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {




  return (
    <section className="bg-black text-white   relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 header-container"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center  justify-center relative z-10">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center ml-6 lg:text-left mb-12 ">
          {/* <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-5xl text-black font-bold  mb-6 "
          >
            <span className="  opacity-80  ">Illuminate Your Shopping!  </span>

              </motion.h1> */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl text-black  font-bold mb-6 "
          >
            <span className="opacity-80"> Don&apos;t just watch,{" "}<br /></span>

            <span className="text-red-600 lg:p-38 m-10 p-20">Let&apos;s buy it!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-100 text-lg mt-8 mb-8"
          >
            Discover the latest trends in fashion and elevate your style with
            AuraCart. <br /> Quality you can trust, delivered to your doorstep.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-red-600  hover:bg-red-700 text-white font-bold py-3 mt-10 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </motion.div>
        </div>

        {/* Right Side: Morphing Image Effect */}
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="  relative"
          >
            <Image
              src="/hero-pic.png" // Replace with your image
              alt="Fashion Model"
              width={450}
              height={100}
              className="   lg:visible  lg:ml-30 opacity-60  object-cover   rounded-lg  mix-blend-lighten  "
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Red Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, x: Math.random() * 100 - 50, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="w-2 h-2 bg-red-600 rounded-full absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;