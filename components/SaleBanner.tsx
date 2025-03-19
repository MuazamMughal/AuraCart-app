
import { COUPON_CODES } from '@/sanity/lib/sales/couponCoads'
import { getActiveSalesByCouponCode } from '@/sanity/lib/sales/getActiveSalesByCouponCode'
import React from 'react'

async function  SaleBanner () {
    const sale = await getActiveSalesByCouponCode(COUPON_CODES.NEWYEAR)
if(!sale?.isActive){
    return null
}
return (
  <div className="bg-black py-4  opacity-70 px-6 shadow-lg relative overflow-hidden">
    {/* Animated Red Particles (CSS-based) */}
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-red-900 rounded-full absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>

    {/* Banner Content */}
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-800 animate-pulse">
        {sale.title} SALE ALERT! 
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-300 mb-6">
      Use Coupon{" "}
        <span className="font-bold text-red-500">  &quot;{sale.couponCode}&quot;  </span>
        Grab your favorites now at{" "}
        <span className="font-bold text-red-500"> {sale.discountAmount}% OFF </span>! Limited time
        only. Don&apos;t miss out!
      </p>

      
    </div>
  </div>
);

};

export default SaleBanner;
