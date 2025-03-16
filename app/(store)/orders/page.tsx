import { formatCurrency } from '@/lib/formatCurrency'
import { imageUrl } from '@/lib/imageUrl'
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { form } from 'sanity/structure'

const OrderPage = async () => {

    const { userId } = await auth()
    if (!userId) {
        return redirect("/")
    }

    const orders = await getMyOrders(userId)

    return (
        <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4'>
            <div className=' bg-white p-4 sm:p-8 rounded-xl shadow-xl  w-full max-w-4xl'>

                <h1 className=' text-4xl  font-bold text-gray-500 tracking-tight mb-8'>
                    My Orders
                </h1>
                {orders.lenght === 0 ? (
                    <div className='text-center text-gray-600'>
                        <p> No Any Orders Yet</p>
                    </div>
                ) : (
                    <div className=' space-y-6  sm:space-y-8'>
                        {orders.map((order: any) => (
                            <div
                                key={order.orderNumber}
                                className=' bg-white border border-gray-200 rounded-lg
                        shadow-sm overflow-hidden'>
                                <div className=' p-4 sm:p-6 border-b border-gray-300'>
                                    <div className=' flex flex-col gap-4 sm:flex-row sm:justify-between
                        sm:items-center mb-4'>
                                        <div >
                                            <p className=' text-sm text-gray-600 mb-1 font-bold'>
                                                Order Number
                                            </p>
                                            <p className=' font-mono text-sm text-green-600 break-all'>
                                                {order.orderNumber}                            </p>
                                        </div>
                                        <div className=' sm:text-right'>
                                            <p className=' text-sm text-gray-700 mb-1'>Order Date</p>
                                            <p className='font-medium'>
                                                {order.orderDate ? new Date(order.orderNumber).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=' flex flex-col gap-4 sm:flex-row  sm:justify-between sm:items-center'>
                                    <div className=' flex items-center'>
                                        <span className=' text-md mr-2'> Status : </span>
                                        <span className={` px-3 py-1 rounded-full text-sm ${order.Status === "paid" ? " bg-green-200 text-green-800" : " bg-gray-200 text-gray-800"
                                            }`}>
                                            {order.status}

                                        </span>
                                    </div>
                                    <div className=' sm:text-right'>
                                        <p className='text-sm text-gray-600 mb1'>
                                            Total Amount
                                        </p>
                                        <p className=' font-bold text-lg'>
                                            {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                        </p>
                                    </div>

                                </div>
                                {order.amountDiscount ? (
                                    <div className=' mt-4 p-3 sm:p-4 bg-red-100 rounded-lg'>
                                        <p className=' text-red-600 font-medium mb-1 text-sm sm:text-base'>
                                            Discount Applied: {""}
                                            {formatCurrency(order.amountDiscount, order.currency)}
                                        </p>
                                        <p className=' text-sm text-gray-600'>
                                            SubTotal : {""}
                                            {formatCurrency(
                                                (order.totalPrice ?? 0) + order.amountDiscount, order.currency
                                            )}
                                        </p>
                                    </div>
                                ) : null}
                                <div className=' px-4 py-3 sm:py-4'>
                                    <p className=' text-sm font-semibold text-gray-600 mb-3 sm:mb-4'>
                                        Order Items
                                    </p>
                                    <div className=' space-y-3 sm:space-y-4'>
                                        {order.product?.map((product: any) => (
                                            <div key={product.product?._id}
                                                className='Flex flex-col sm:flex-row sm:items-center sm:justify-between
                                             gap-3 border-b last:border-b-0'>
                                                <div className=' flex  items-center gap-3 sm:gap-4'>
                                                    {product.product?.image && (
                                                        <div className=' relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0
                                                 rounded-md overflow-hidden'>
                                                            <Image
                                                                src={imageUrl(product.product.image).url()}
                                                                alt={product.product?.name ?? ""}
                                                                className=' object-cover'
                                                                fill />
                                                        </div>
                                                    )}
                                                    <div >
                                                        <p className=' font-medium text-sm sm:text-base'>
                                                            {product.product?.name}
                                                        </p>
                                                        <p className=' text-sm text-gray-700'>
                                                            Quantity : {product.quantity ?? "N/A"}
                                                        </p>

                                                    </div>
                                                </div>
                                                <div className=' font-medium text-right'>
                                                    {product.product?.price && product.quantity
                                                    ? formatCurrency(
                                                        product.product.price * product.quantity , order.currency
                                                    ) : "N/A"}

                                                </div>

                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}

export default OrderPage