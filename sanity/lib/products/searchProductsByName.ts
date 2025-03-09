import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const searchProductsByName = async(serarchParams:string)=>{
    const PRODUCT_SEARCH_QUERY =defineQuery(`*[_type == "product" && name match $searchParams]|order(name asc)`)

    try{
        const product = await sanityFetch({
            query:PRODUCT_SEARCH_QUERY,
            params:{
                searchParams: `${serarchParams}*`
            }
        }) 
        return product.data || []
    }
    catch(error){
        console.log("this is the error in search Product by productName" , error)
        return null
    }
}