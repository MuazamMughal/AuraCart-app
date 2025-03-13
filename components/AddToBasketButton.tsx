
"use client"
import useBasketStore from '@/app/(store)/store'
import { Product } from '@/sanity.types'
import React, { useEffect, useState } from 'react'

interface AddToBasketProps{
    product:Product
    disabled?:boolean
}

const AddToBasketButton = ( {product,disabled}:AddToBasketProps) => {
    const{addItem , removeItem , getItemCount}=useBasketStore()
    const[isClient , setIsClient]= useState(false)
    const itemCount = getItemCount(product._id)
    // to avid server client mismatch we use  useEffect to set isclient to true after component mounts to ensuer that it render on client side 
    useEffect(()=>{
        setIsClient(true)
    }, [])
    if(!isClient){
        return null
    }
  return (
    <div className=' flex items-center justify-center space-x-2'>
        <button 
        onClick={()=>removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center 
        transition-colors duration-200 ${
            itemCount === 0 ? " bg-gray-100 cursor-not-allowed" : " bg-gray-200 hover:bg-gray-300"
        }`}>
            <span className={`text-xl font-bold ${itemCount === 0 ?"text-gray-400":
                "text-gray-600"
            }`}>
                -
            </span>

        </button>
<span className=' w-8 text-center font-semibold'>{itemCount}</span>
<button 
        onClick={()=>addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center 
        transition-colors duration-200 ${
            disabled ? " bg-gray-400 cursor-not-allowed" : 
            " bg-red-500 hover:bg-red-800"
        }`}
        disabled={disabled}
        >
            <span className="font-bold text-white text-xl">
                +
            </span>

        </button>
    </div>
  )
}

export default AddToBasketButton