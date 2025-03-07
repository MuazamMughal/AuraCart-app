import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name:"sales",
    title:"Sales",
    type:"document",
    icon:TagIcon,
    fields:[
        defineField({
            name:"title",
            title:"Sale Title",
            type:"string",
        }),
        defineField({
            name:"decryption",
            title:"Sale Description",
            type:"text",
        }),
        defineField({
            name:"discountAmount",
            title:"Discount Amount",
            type:"number",
            description:"Amount of discount in percentage",
        }),
        defineField({
            name:"validFrom",
            title:"Valid From",
            type:"datetime",
        }),
        defineField({
            name:"validUntil",
            title:"Valid Till",
            type:"datetime",
        }),
        defineField({
            name:"couponCode",
            title:"Coupon Code",
            type:"string",
        }),
        defineField({
            name:"isActive",
            title:"Is Active",
            type:"boolean",
            description:"Is the sale active or not",
            initialValue:true,

        })

    ],
    preview:{
        select:{
            title:"title",
            discountAmount:"discountAmount",
            couponCode:"couponCode",
            isActive:"isActive",
        },
        prepare(selection){
            const {title,discountAmount,couponCode,isActive} = selection;
            const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle:`${discountAmount}% off - Code:  ${couponCode} - ${status}`,
        }
    }
    }
})