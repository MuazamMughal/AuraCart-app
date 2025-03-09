import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { notFound } from 'next/navigation'
import React from 'react'

 async  function Productpage ({ params }: { params: Promise<{ slug: string }> })  {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }
  return (
    <div className='text-white'>

      this our product page

    </div>
  )
}

export default Productpage