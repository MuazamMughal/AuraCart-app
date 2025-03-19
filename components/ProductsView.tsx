import { Category, Product } from '@/sanity.types'
import React from 'react'

import ProductGrid from './ProductGrid'
import { CategorySelectorComponent } from './ui/category-selector'

interface ProductsViewProps {
    products: Product[],
    categories: Category[]
}

const ProductsView = ({ products  , categories }: ProductsViewProps) => {
    return (
        <div className='flex flex-col pb-15 '>
            {/* we have to devide this in to secgments catogery and products */}

            {/* now ther is by the category */}
                <div className=' w-full sm:w-[200px]'>
                    <CategorySelectorComponent  categories={categories}/>
             </div>


            {/* so this is by the products  */}
            <div className='flex-1'>


                <div>
                    <ProductGrid products={products}   />
                   
                </div> 
                <hr className='w-1/2  sm:w-3/4 mt-16 ' />
                
            </div>
            

        </div>
    )
}

export default ProductsView