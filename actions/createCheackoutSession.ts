"use server"

import { BasketItem } from "@/app/(store)/store"
import { imageUrl } from "@/lib/imageUrl"
import stripe from "@/lib/stripe"


export type Metadata = {
    orderNumber: string,
    customerName: string,
    coustomerEmail: string,
    clerkUserId: string,
}
export type GroupedBasketItem = {
    product: BasketItem["product"]
    quantity: number
}

export async function createCheackOutSession(
    items: BasketItem[],
    metadata: Metadata
) {
    try {
        const itemWithoutPrice = items.filter((item) => !item.product.price)
        if (itemWithoutPrice.length > 0) {
            throw new Error(" Some item do not have price")
        }
        // search for is coustomer is existing or not 
        const customer = await stripe.customers.list({
            email: metadata.coustomerEmail,
            limit: 1
        })
        let customerId: string | undefined
        if (customer.data.length > 0) {
            customerId = customer.data[0].id
        }

        const baseUrl = 
        process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : `${process.env.NEXT_PUBLIC_BASE_URL}`;
        const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber = ${metadata.orderNumber}`
        const cancelurl= `${baseUrl}/basket`


        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.coustomerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url:successUrl,
            cancel_url:cancelurl,

            line_items: items.map((item) => ({
                price_data: {
                    currency: "gbp",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product Id ${item.product._id}`,
                        metadata: {
                            id: item.product._id
                        },
                        images: item.product.image ? [imageUrl(item.product.image).url()] : undefined
                    }
                },
                quantity: item.quantity,
            }))
        })
        return session.url
    } catch (error) {
        console.error("error creating cheackout session", error)
        throw error
    }

}