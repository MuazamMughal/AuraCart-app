
"use client";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/app/(store)/store';

const Header = () => {
  const itemCount = useBasketStore((state)=>
  state.items.reduce((total , item)=>total+item.quantity,0))
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error creating passkey", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="header-container">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <Image src="/logo.png" alt="logo" width={160} height={30} />
        </Link>

        {/* Search Form */}
        <form action="/search" className="header-search-form">
          <input
            type="text"
            name="query"
            placeholder="Search any item here"
            className="header-search-input"
          />
        </form>

        {/* Basket, Orders, and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Basket */}
          <Link href="/basket" className="header-action-link relative">
             <span className=' absolute -top-2 -right-2 bg-white text-red-800
            rounded-full w-5 h-5 flex items-center justify-center text-xs'>
              {itemCount}</span><TrolleyIcon className="w-6 h-6" />
           
            <span>My Cart</span>
          </Link>

          {/* Orders (Visible only when signed in) */}
          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders" className="header-action-link">
                <PackageIcon className="w-6 h-6" />
                <span>Orders</span>
              </Link>
            </SignedIn>
          </ClerkLoaded>

          {/* User Button or Sign In */}
          <ClerkLoaded>
            {user ? (
              <div className="header-user-container">
                <UserButton />
                {user.passkeys.length === 0 && (
                  <button
                    onClick={createClerkPasskey}
                    className="header-passkey-button ml-3  !bg-red-600"
                  >
                    Create Passkey
                  </button>
                )}
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="header-signin-button">Sign In</button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;