"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import useBasketStore from '../store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SuccessPage = () => {
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber")
    const clearBasket = useBasketStore((state) => state.clearBasket)

    // then we use useEffect to cleare the basket 

    useEffect(() => {
        if (orderNumber) {
            clearBasket()
        }
    }, [orderNumber, clearBasket])

    return (
        <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className=' bg-white p-12 rounded-xl shadow-xl max-w-2xl w-full mx-4'>
                <div className=' flex justify-center mb-8'>
                    <div className=' h-16 w-16 bg-red-300 rounded-full items-center justify-center'>
                        <svg
                            className=' h-16 w-16 text-green-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap='round'
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d='M5 13l4 4L19 7'
                            />

                        </svg>

                    </div>
                </div>

                <h1 className=' text-4xl font-bold mb-6 text-center'>
                    Thank You for Order
                </h1>
                <div className=' border-t border-b border-gray-200 py-6 mb-6'>
                    <p className=' text-lg text-gray-700 mb-4 text-center' >
                        Your order has been confirmed and shipped you soon
                    </p>
                    <div className='space-y-2'>
                        {orderNumber && (
                            <p className=' text-gray-600 flex items-center space-x-5'>
                                <span>Order Number : </span>
                                <span className=' font-mono text-sm text-green-500'>
                                    {orderNumber}
                                </span>

                            </p>
                        )}

                    </div>

                </div>
                <div className=' space-y-4'>
                    <p className=' text-gray-400 text-center'>
                        Confirmiation Email has been sent to your registered address

                    </p>
                    <div className=' flex flex-col  sm:flex-row gap-4 justify-center'>
                        <Button
                        className=' bg-red-500 hover:bg-red-600'
                        asChild>
                            <Link href="/orders"> View your Orders</Link>
                        </Button>
                        <Button
                        className=' bg-red-500 hover:bg-red-600'
                        asChild>
                            <Link href="/"> Continue Shoping</Link>
                        </Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SuccessPage