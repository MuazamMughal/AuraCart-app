import { Category, Product } from '@/sanity.types'
import React from 'react'
import CategorySelectorComp from './CategorySelectorComp'
import ProductGrid from './ProductGrid'

interface ProductsViewProps {
    products: Product[],
    categories: Category[]
}

const ProductsView = ({ products  , categories }: ProductsViewProps) => {
    return (
        <div className='flex flex-col '>
            {/* we have to devide this in to secgments catogery and products */}

            {/* now ther is by the category */}
                <div className=' w-full sm:w-[200px]'>
                    <CategorySelectorComp  categories={categories}/>
             </div>


            {/* so this is by the products  */}
            <div className='flex-1'>


                <div>
                    <ProductGrid products={products}   />
                    <hr className='w-1/2 sm:w-3/4' />
                </div>
            </div>

        </div>
    )
}

export default ProductsView