import { Metadata } from "@/actions/createCheackoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req:NextRequest) {
    const body = await req.text()
    const headerList = await headers()
    const sig = headerList.get("stripe-signature")
    if(!sig){
        return NextResponse.json({error:"No signature"} , {status:400})
    }
const webhookSecert = process.env.STRIPE_WEBHOOK_SECRET

if(!webhookSecert){
    console.log("stripe webhooksecert is not avaliable")
    return NextResponse.json(
        {error: "Stripe webhook secert is not set"},
        {status:400}
    )
}
let event : Stripe.Event;
try{
event=stripe.webhooks.constructEvent(body,sig,webhookSecert)
}catch(err){
    console.log("stripe webhook signature verification failed" , err)
    return NextResponse.json(
        {error: "stripe webhook signature verification failed",err},
        {status:400}
    )
}
if(event.type === "checkout.session.completed"){
    const session = event.data.object as Stripe.Checkout.Session;
    try{
        const order = await createOrderInSanity(session)
        console.log("Order created in sanity" , order)

    }catch(err){
        console.log("error creating order in sanity " , err)
        return NextResponse.json(
            {error: "error creating sanity"},
            {status:400}
        )
    }
}
return NextResponse.json({recived:true})
}
async function createOrderInSanity(session:Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    }= session;

    const {orderNumber , customerName,coustomerEmail,clerkUserId}=metadata as Metadata

   const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
        expand: ["data.price.product"],
    }
   )
   const sanityProduct = lineItemsWithProduct.data.map((item) => ({
    _key:crypto.randomUUID(),
    product:{
        _type :"reference",
        _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0
   }))
   const order = await backendClient.create({
    _type:"order",
    orderNumber,
    stripeCheckoutaaSessionId:id,
    stripePaymentIntentId:payment_intent,
    customerName,
    stripeCustomerId : customer,
    clerkUserId: clerkUserId,
    email:coustomerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products : sanityProduct,
    totalPrice : amount_total ? amount_total / 100 :0,
    status:"paid",
    orderDate:new Date().toISOString(),


   })
}


