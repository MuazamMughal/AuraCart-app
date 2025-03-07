"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


 
  return (
    <section className="bg-black text-white   relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 header-container"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center  justify-center relative z-10">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl text-black font-bold mb-6"
          >
            Don&apos;t just watch,{" "}
            <span className="text-red-600">Let&apos;s buy it!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300 text-lg mb-8"
          >
            Discover the latest trends in fashion and elevate your style with
            AuraCart. Quality you can trust, delivered to your doorstep.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
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
// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const Hero = () => {
//   return (
//     <section className=" text-white   overflow-hidden">
//       {/* Gradient Background */}
//       <div className=" "></div>

//       <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative ">
//         {/* Left Side: Text Content */}
//         <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-5xl md:text-6xl font-bold mb-6"
//           >
//             Elevate Your Style with{" "}
//             <span className="text-red-600">AuraCart</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="text-gray-300 text-lg mb-8"
//           >
//             Discover the best trends in fashion. Quality you can trust, delivered
//             to your doorstep. Redefine your wardrobe today.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
//               Explore Best Trends
//             </button>
//           </motion.div>
//         </div>

//         {/* Right Side: Image with Motion Effect */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="  w-2xl"
//         >
//           <Image
//             src="/hero-pic.png" // Replace with your image
//             alt="Fashion Model"
//             width={500}
//             height={400}
//             className="   opacity-80 scale-x-[-1]   rounded-lg"
//             priority
//           />
//         </motion.div>
//       </div>

//       {/* Animated Red Particles */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ y: -10, x: Math.random() * 100 - 50, opacity: 0 }}
//             animate={{ y: "100vh", opacity: [0, 1, 0] }}
//             transition={{
//               duration: Math.random() * 3 + 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//             className="w-2 h-2 bg-red-600 rounded-full absolute"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           ></motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;