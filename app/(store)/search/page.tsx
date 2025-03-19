import ProductGrid from '@/components/ProductGrid'
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName'
import React from 'react'
// so the main thing to concider is that in Next.js15 
// the aprameter of geting the serch prms from the urs is differet from next14

async function SearchPage({searchParams}:{searchParams: Promise<{query: string}>}) {
    
    const {query} =await searchParams
    const products = await searchProductsByName(query)
    // writing the without item logic
    if(!products?.length){

        return(
        <div className='flex flex-col  items-center justify-top min-h-screen p-4 text-red-800'>
            <div className='p-8 rounded-lg shadow-md w-full max-w-4xl'>
            <h1 className=' text-3xl font-bold m-6 text-center'>
                No products found for this :&quot;{query}&quot;
            </h1>
            <p className='text-center'>
                Try different search keyword
            </p>
        </div>
        
        </div>
        
    )
    }
    return (
        <div className='flex flex-col  items-center justify-top min-h-screen p-4 text-red-800'>
            <div className='p-8 rounded-lg shadow-md w-full max-w-4xl'>
            <h1 className=' text-3xl font-bold m-6 text-center'>
                Search Results For Query : &quot;{query}&quot;
            </h1>
           {<ProductGrid products={products}/>}
        </div>
        
        </div>
    )
    
}

export default SearchPage