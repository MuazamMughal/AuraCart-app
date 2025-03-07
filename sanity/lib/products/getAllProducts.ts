import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"


export const getAllProducts = async () => {
    
const ALL_PRODUCTS_QUERY =  defineQuery(
    `*[
        _type == "product"] | order( name asc ) `
)

// now passing all this to the sanit fetch function in try catch 

try{
    const product = await sanityFetch({
        query: ALL_PRODUCTS_QUERY
    })
    // now this returnt the list of product or emptyn if there is noanything 

    return product.data || []
}catch(error)
{
    console.error("Error to fetch all the product",error)
    return []
}

}