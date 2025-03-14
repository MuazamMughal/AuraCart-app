"use Server"

import { BasketItem } from "@/app/(store)/store"
import stripe from "@/lib/stripe"
import Stripe from "stripe"

export type Metadata = {
    orderNumber :string,
    customerName :string,
    coustomerEmail:string,
    clerkUserId: string,
}
export type GroupedBasketItem = {
    product : BasketItem["product"]
    quantity : number
}

export async function createCheackOutSession(
    items:BasketItem[],
    metadata:Metadata
) {
    try{
        const itemWithoutPrice = items.filter((item) => item.product.price)
        if(itemWithoutPrice.length> 0){
            throw new Error(" Some item do not have price")
        }
        // search for is coustomer is existing or not 
       const customer = await stripe.customers.list({
        email:metadata.coustomerEmail,
        limit:1
       })
       let customerId : string | undefined
       if(customer.data.length>0){
        customerId = customer.data[0].id
       }
       const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_creation: customerId ? undefined : "always",
        customer_email : !customerId ? metadata.coustomerEmail : undefined,
        metadata,
        mode:"payment",
        allow_promotion_codes:true
       })

    }catch(error){
        console.error("this error is due to server actions" , error)
        throw error
    }
    
}