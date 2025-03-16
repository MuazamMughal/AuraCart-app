import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export async function getMyOrders(userId:string){
    if(!userId){
        throw new Error(" User ID is required")
    }
    const ORDERS_QUERY = await defineQuery(`
         *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
    ...,
    product[] {
        ...,
        product->
    }
}
                
               
            
            
    `)

    try{
        const orders = await sanityFetch({
            query: ORDERS_QUERY,
            params:{
                userId,
            }
        })
        return orders.data || []

    }catch(error){
        console.error(" this error in in Order Query",error)
        throw new Error("Error Fetching orders")
    }
}