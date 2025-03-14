"use client"

import React, { useEffect, useState } from 'react'
import useBasketStore from '../store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'

import AddToBasketButton from '@/components/AddToBasketButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { imageUrl } from '@/lib/imageUrl'
import Loader from '@/components/ui/loader'
import { createCheackOutSession, Metadata } from '@/actions/createCheackoutSession'




const BasketPage = () => {
    const groupedItems = useBasketStore((state) => state.getGroupedItems())

    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    const [isCLient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsClient(true)
    },[])
    if(!isCLient){
        return <Loader/>
    }

    if (groupedItems.length === 0) {
        return (
            <div className='container max-h-auto p-4 flex flex-col items-center justify-center
        min-h-[50vh]' >
                <h1 className=' text-2xl font-bold text-gray-800'> Your Basket</h1>
                <p>Your basket is empty </p>

            </div>
        )
    }
    // const handleCheackout   = async () =>{
    //     if(!isSignedIn){
    //         setIsLoading(true)
    //     }
    
//     try{
// const metadata: Metadata={
//     orderNumber :crypto.randomUUID(),
//     customerName :user?.fullName ?? "Unknown",
//     coustomerEmail:user?.emailAddresses[0].emailAddress??"Unknown",
//     clerkUserId: user!.id,
// }
// const cheackoutUrl = await createCheackOutSession(groupedItems , metadata);
// if(cheackoutUrl){
//     window.location.href = cheackoutUrl
// }

//     }catch(error){
// console.error(error)
//     }finally{
//         setIsLoading(false)
//     }
//     }
    return (
        <div className='container mx-auto p-4 max-w-6xl'>
            <h1 className='text-2xl font-bold mb-4'> Your Basket</h1>
            <div className=' flex flex-col lg:flex-row gap-8'>
                <div className=' flex-grow'>
                    {groupedItems?.map((item) => (
                        <div key={item.product._id}
                            className=' mb-4 p-4 border rounded flex items-center justify-between'>
                            <div className=' flex items-center  cursor-pointer flex-1 min-w-0'
                            onClick={()=>{
                                router.push(`/product/${item.product.slug?.current}`)
                            }}>
                                <div className=' w-20  h-20 sm:h-24 flex-shrink-0 mr-4'>
                                    {
                                        item.product.image  && (
                                            <Image 
                                            src={imageUrl(item.product.image).url()}
                                            alt={item.product.name ?? "product image"}
                                            width={96}
                                            height={96}
                                            className=" w-full h-full object-cover rounded"/>

                                        )
                                    }
                                </div>
                                <div className=' min-h-0'>
                                    <h2 className='text-lg sm:text-xl font-semibold truncate'>{item.product.name}</h2>
                               <p className='text-sm sm:text-base'>
                                Price: $
                                {((item.product.price ?? 0)* item.quantity).toFixed(2)}
                               </p>
                                </div>
                                 </div>
                            <div className=' flex items-center ml-4 flex-shrink-0'>
                            <AddToBasketButton product={item.product} />
                        </div>
                        </div>
                    ))}
                </div>
                <div className=' w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first
                lg:order-last fixed bottom-0 left-auto lg:left-auto'>
                    <h3 className=' text-xl font-semibold'> Order Summary</h3>
                    <div className=' mt-4 space-y-2'>
                        <p className=' flex justify-between'>
                            <span>items : </span>
                            <span>{groupedItems.reduce((total, item)=>total+ item.quantity,0)}</span>
                        </p>
                        <p className=' flex justify-between text-2xl font-bo;d border-t pt-2'>
                            <span>Total : </span>
                            <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
                        </p>
                    </div>
                    {isSignedIn ? (
                        <button
                        // onClick={handleCheackout}
                        disabled={isLoading}
                        className=' mt-4 w-full bg-red-500 text-white px-4 py-2 rounded *:hover:bg-red-700
                        disabled:bg-gray-400 '>
                            {isLoading ? "Procesing" : "Checkout"}

                        </button>
                    ):(
                        <SignInButton mode='modal'>
                            <button className='mt-4 w-full bg-red-500 text-white px-4 py-2 rounded *:hover:bg-red-700
                        '>
                                Sign in to Cheackout
                            </button>
                        </SignInButton>
                    )}

                </div>
            </div>
        </div>
    )
}

export default BasketPage