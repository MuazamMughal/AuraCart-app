import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"


export const getAllCategories = async () => {
    
const ALL_Categories_QUERY =  defineQuery(
    `*[
        _type == "category"] | order( name asc ) `
)

// now passing all this to the sanit fetch function in try catch 

try{
    const categories = await sanityFetch({
        query: ALL_Categories_QUERY
    })
    // now this returnt the list of product or emptyn if there is noanything 

    return categories.data || []
}catch(error)
{
    console.error("Error to fetch all the Categories",error)
    return []
}

}