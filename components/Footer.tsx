import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="text-white header-container">
            <div className="container header-container mx-auto flex flex-col md:flex-row justify-around items-center">
                <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                    <Link href="/" className="text-xl font-bold">
                        <Image src="/logo.png" alt="AuraCart Logo" width={150} height={150} />
                    </Link>
                    <p className="mt-2 text-sm text-slate-800 text-center md:text-left">
                        Our vision is to revolutionize e-commerce by providing a seamless and personalized <br /> shopping experience for everyone.
                        By fostering innovation and embracing change,<br /> we strive to set new standards in the industry and build lasting relationships with our customers.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto">
                    <div className="flex flex-row md:flex-row md:space-x-8 w-full justify-around md:justify-start">
                        <div>
                            <h4 className="font-bold mb-2">Quick Links</h4>
                            <ul>
                                <li><Link href="/shop">Shop</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/faq">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Contact Us</h4>
                            <ul>
                                <li>Email: support@auracart.com</li>
                                <li>Phone: +123 456 7890</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                <p>&copy; {new Date().getFullYear()} AuraCart. All rights reserved. Creativity By Muazam Mughal</p>
            </div>
        </footer>
    );
};

export default Footer;