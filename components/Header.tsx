"use client"
import { ClerkLoaded, SignedIn, SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'



const Header = () => {

    const { user } = useUser()
    console.log(user)

    const createClerkPasskey = async() => { 
        try{
            const response =await user?.createPasskey()
            console.log(response)
        }catch(err){
            console.error("Error creating passkey", JSON.stringify(err, null, 2))
        }
        // after this when we creating the passkey next gives the So we hae to enable it from the clerk dashbord 
    }
    return (
     <header className='flex  bg-neutral-900 flex-wrap justify-between items-center  px-4 py-2'>
         <div className='flex flex-wrap  w-full items-center jsutify-between'>
             <Link href='/'>
                    <Image src="/logo.png" alt="logo" width={154} height={30} />
              </Link>

                {/* now i createt eh form write there?
     */}
                <Form action="/search"
                    className=' lg:px-20 sm-w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
                    <input
                        type="text"
                        name="query"
                        placeholder="search Any item here"
                        className="px-10 py-2 
              bg-white-gray-100
              text-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              focus:ring-opasity-50
              border-2
              border-red-800
              hover:border-red-400
              
              w-full
              mx-w4xl
              rounded-lg"/>

                </Form>

                {/* now creating the basket are there */}
                <div className='flex items-center space-x-4 mt-4 sm:flex-none sm:mt-0 flex-1'>
                    <Link href='/basket'
                        className='flex-1 reletive flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2
                     px-3 rounded-lg'>
                        <TrolleyIcon className='w-6 h-6  '
                        // item is counterd when we implement the globkel state counter 
                        />
                        <span className=''>My Cart</span>
                    </Link>
                    {/* now here we design the user credintial verification area 
         */}
                    <ClerkLoaded>
                        <SignedIn>


                            <Link href='/orders'
                                className='flex-1 reletive flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2
                     px-3 rounded-lg'>
                                <PackageIcon className='w-6 h-6  ' />
                                <span>Orders</span>

                            </Link>
                        </SignedIn>
                        {user ? (
                            <div className='flex items-center space-x-2'>
                                <UserButton />
                                <div className='hidden sm:block text-xl'>
                                    <p className=' text-gray-400'>Welcome Back</p>
                                    <p className='font-bold  text-red-600'>{user.fullName}</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton mode='modal' />
                        )}
                        {/* now here we have to createet he function that the user has passkey or not */}
                        {user?.passkeys.length == 0 && (
                            <button
                                onClick={createClerkPasskey}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg animate-pulse border border-blue-300 '>
                                Create Passkey

                            </button>
                        )}


                    </ClerkLoaded>
                </div>
            </div>

        </header>
    )
}

export default Header