import { imageUrl } from '@/lib/imageUrl'
import { Product } from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductThumbnail  ({ product }: { product: Product })  {
  // now here is outofstock logic 
  const isOutOfStock = product.stock != null && product.stock <= 0
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col  bg-transparent text-black rounded-lg  shadow-2xl border-4 border-gray-300 hover:border-gray-400
    hover:shadow-xl transition-all  duration-300 overflow-hidden ${isOutOfStock ? 'opacity-50' : ''}`}>

      <div className='relative aspect-square h-full w-full overflow-hidden '>
        {product.image && (
          <Image
            className=" object-contain  opacity-90 bg transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "product image"}
            fill
            sizes=" (max-width:768px) 100vw , (max-with : 1200px) 50vw, 33vw" />
        )}
        {isOutOfStock && (
          <div className=' absolute inset-0 flex items-center justify-center bg-opacity-50 bg-green-900'>
            <span className='text-white text-lg font-bold'> Out of Stock</span>

          </div>
        )}

      </div>
      <div className='p-4'>
        <h2 className='text-lg font-semibold truncate text-gray-50 '>
          {product.name}
        </h2>

        <p className='mt-2 text-sm text-gray-500 line-clamp-2'>
          {product.description?.map((block) =>
            block._type=="block" 
            ? block.children?.map((child)=>child.text).join(""): ""
          ).join("")|| "no decription"
          }

        </p>
        <p className='mt-2 text-lg font-bold text-red-600'>
        £{product.price}
        </p>
        
      </div>

    </Link>
  )
}

export default ProductThumbnail