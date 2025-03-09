import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getProductBySlug  = async( slug:string) =>{

    const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" || slug.current == $slug]| order(name asc)[0]`)



    try{ 
        const product = await sanityFetch({
            query:PRODUCT_BY_SLUG_QUERY,
            params:{
                slug:`${slug}`
            }
        })
        return product.data || []
    }
    catch (error){
        console.log("this error is failed to fetch Products by Slugs" , error)
    }return null
} 