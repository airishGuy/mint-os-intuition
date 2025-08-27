'use client';
import React, { useState } from 'react';
import { Logo } from './Logo';
import { Plus, Wallet, User, Grid } from 'lucide-react';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { truncateAddress } from '@/utils';


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { address } = useAccount();



    return (
        <nav className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex items-center justify-between h-16">
                    <Logo />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                         <Link
                            href="/"
className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"                        >
                            View All Collections
                        </Link>
                        <Link
                            href="/list"
                            className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                            + List Token
                        </Link>

                        <Link
                            href="/mynfts"
className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"                        >
                            My NFTs
                        </Link>

  
                        {/* header oo */}
                        <ConnectButton showBalance={true} />
    
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="text-white p-2"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"                        >
                           View All Collections
                        </Link>
                        <Link
                            href="/list"
                            className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"
                        >
                            + List Token
                        </Link>

                        <Link
                            href="/mynfts"
className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors cursor-pointer"                        >
                            My NFTs
                        </Link>

  
                        {/* header oo */}

                        {/* ............................................... */}
                        <ConnectButton showBalance={true} />


                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
