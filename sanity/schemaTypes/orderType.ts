import { BellIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({

    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: BellIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "Stripe Checkout Session Id",
            type: "string",
        }),
        defineField({
            name: "StripeCustomerId",
            title: "Stripe Customer Id",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        // now next we have to make the big part to make the coustom object withi it 
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Product Bought",
                            type: "reference",
                            to: [{ type: "product" }],
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity Purchased",
                            type: "number",

                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency"
                        },
                        prepare(select) {
                            return {
                                title: `${select.product}  x ${select.quantity}`,
                                subtitle: `${select.quantity} x ${select.price} `,
                                media: select.image,
                            }
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation: (Rule) => Rule.required(),

        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "amountDiscounted",
            title: "Amount Discounted",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Paid", value: "paid" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                ],
            },
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        })

    ],
    preview: {
        select: {
            name: "Customer Name",
            amount: "totalPrice",
            currency: "currency",
            orderID: "orderNumber",
            email: "email",
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderID.slice(0, 5)}...${select.orderID.slice(-5)}`
            return {
                title: `${select.name} - ${orderIdSnippet}`,
                subtitle: `${select.amount} ${select.currency}  , ${select.email}`,
                media: BellIcon
            }
        }
    }

})