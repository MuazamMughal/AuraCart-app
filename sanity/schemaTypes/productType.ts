import { icons, TrolleyIcon } from "@sanity/icons";
import { defineField, defineType, Preview } from "sanity";



export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon : TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),

        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),



    ],
    // to geting the preview of the objects we have to write the preview object 
     preview: {
        select: {
            title: 'name',
            media: 'image',
            subtitle: 'price',
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.subtitle}`,
                media: select.media,
            };
        }
    }
})
// so the the next step is to connet that shema type to the index ,ts file in sanity 