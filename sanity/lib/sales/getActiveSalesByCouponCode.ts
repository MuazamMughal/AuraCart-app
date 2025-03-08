import { defineQuery } from "next-sanity"
import { CouponCode } from "./couponCoads"
import { sanityFetch } from "../live"


export const getActiveSalesByCouponCode =async(couponCode : CouponCode) =>{

    const ACTIVE_SALE_BY_COUPON_CODE =  defineQuery( `*[_type == "sales" && isActive == true && couponCode == $couponCode] | order(validFrom desc)[0]`)

        try{
            const activeSale = await sanityFetch({
                query : ACTIVE_SALE_BY_COUPON_CODE,
                        params:{
                            couponCode
                        }
            })
            return activeSale ? activeSale.data:null
        }catch(error){
            console.log("This is the error due to getactiveSalesByCouponcode" , error)
            return null
        }
}