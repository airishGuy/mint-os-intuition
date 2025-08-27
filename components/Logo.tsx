import Link from 'next/link';
import React from 'react';
import MemkoPad from "@/public/memkopad.jpeg";
export const Logo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center space-x-2 p-2 font-bold text-white text-2xl rounded-lg justify-center">
            
            <img
                    src={MemkoPad.src}
                    alt="memkopad"
                    className="w-20 object-cover mr-4"
                />   
        </Link>
    );
};
