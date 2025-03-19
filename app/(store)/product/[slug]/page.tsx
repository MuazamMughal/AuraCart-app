import AddToBasketButton from '@/components/AddToBasketButton'

import { imageUrl } from '@/lib/imageUrl'

import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

import { notFound } from 'next/navigation'
import React from 'react'

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isOutOfStock = product.stock != null && product.stock <= 0


  return (
    <div className='  container bg-gradient-to-r from-stone-100   to-black  text-white opacity-90  mx-auto px-4 py-8'>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 lg:gap-x-32'>
        <div className={` relative aspect-square overflow-hidden rounded-lg  shadow-2xl 
  ${isOutOfStock ? "opacity-50 " : ""}`}>
          {product.image && (
            <Image src={imageUrl(product.image).url()}
              alt={product.name ?? "photo"}
              fill
              className='object-contain transition-transform duration-300 shadow-2xl shadow-red-900 hover:scale-105' />
          )}
          {isOutOfStock && (
            <div className=' absolute inset-0 flex items-center  justify-center bg-black  bg-opacity-50'>
              <span className='text-white font-bold text-lg'>Out Of Stock</span>
            </div>
          )}

        </div>
        <div className=' flex flex-col  justify-center'>
          <div>
          <h1 className=' text-3xl font-extrabold mb-4'>
            {product.name}
          </h1>
          <div className=' text-2xl font-bold text-red-600 mb-4'>
            £{product.price?.toFixed()}
          </div>
          <div className=' prose max-w-none mb-6'> 
            {Array.isArray(product.description) && (
              <PortableText value={product.description} />
            )}

          </div>

        </div>
        <div className=' mt-6 '>
          <AddToBasketButton product = {product} disabled = {isOutOfStock}/>
         

        </div>
</div>
      </div>
    </div>
  )
}

export default ProductPage