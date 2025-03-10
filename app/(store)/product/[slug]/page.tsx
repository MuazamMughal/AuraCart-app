import { imageUrl } from '@/lib/imageUrl'
import { Product } from '@/sanity.types'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

import { notFound } from 'next/navigation'
import React from 'react'

async function ProductPage({params}:{params:Promise<{slug:string}>})  {
    const  {slug} = await params
   
    const product   = await getProductBySlug(slug)
   
     if(!product){
      notFound()
     }
    
    const isOutOfStock = product.stock != null && product.stock <=0


  return (
    <div className='  container text-white mx-auto px-4 py-8'>
<div className=' grid grid-cols-1 md:grid-cols-2 gap=8'>
  <div className={` relative aspect-square overflow-hidden rounded-lg shadow-lg
  ${isOutOfStock ? "opacity-50 ": ""}`}>
    {product.image && (
      <Image src={imageUrl(product.image).url()}
      alt={product.name ?? "photo"}
      fill
      className='object-contain transition-transform duration-300 hover:scale-105'/>
    )}
{isOutOfStock && (
  <div className=' absolute inset-0 flex items-center  justify-center bg-black  bg-opacity-50'>
    <span className='text-white font-bold text-lg'>Out Of Stock</span>
  </div>
)}

  </div>
  <div className=' flex flex-col  justify-center'>
    <div className=' txt-3xl font-bold mb-4'>
      {product.name}
    </div>
    <div className=' text-xl font-bold mb-4'>
    £{product.price?.toFixed()}
    </div>
    <div className=' prose max-w-none mb-6'>
      {Array.isArray(product.description)&&(
        <PortableText value={product.description}/>
      )}

    </div>

  </div>

</div>
    </div>
  )
}

export default ProductPage