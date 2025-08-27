// @ts-nocheck
"use client";
import { useImageLoader } from '@/hooks/useImageLoader';
import { formatRelativeTime, truncateAddress, weiToEther } from '../utils/index';
import Link from 'next/link';
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ERC1155Launchpad from '@/abi/ERC1155Launchpad.json';


interface Collection {
    tokenId: bigint;
    tokenOwner: string;
    name: string;
    symbol: string;
    description: string;
    _imageURI: string;
    price: bigint;
    maxSupply: bigint;
    amountMinted: bigint;
    ethAmount: bigint;
    timeCreated: bigint;
}

interface CollectionCardProps {
    collection: Collection;
    showPrice: boolean;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    collection, showPrice
}) => {


    const [loading, setLoading] = useState<boolean>(false);

    const amountUserMinted = 2; //read from contract...
    const { address } = useAccount();
    const { imageSrc, isLoading, error } = useImageLoader(collection._imageURI || collection.imageURI);

    const { writeContractAsync, isPending, isSuccess } = useWriteContract();



    const handleMint = async(tokenId_: bigint, amount: bigint, _tokenURI: string, price: bigint) => {
        console.log("MINTING...");
        
        try {

        
            setLoading(true);
            await writeContractAsync({
                address: ERC1155Launchpad.address as `0x${string}`,
                abi: ERC1155Launchpad.abi,
                functionName: "mintNFT",
                args: [tokenId_, amount, _tokenURI],
                value: BigInt(price)
            });
            setLoading(false);
            toast.success('Token Minted successfully....');

        } catch(err: any) {
            // close toast
            console.log({errorMessage: err})
            toast.error('Something went wrong. Please try again...');
            console.log(err);
        } 

    }
    return (
        <div className="bg-white text-black rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 p-8">
            
                <img
                    src={imageSrc}
                    alt={collection.name}
                    className="w-full h-48 object-cover"
                />

                {
                    showPrice ? (
                         <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {collection.name} ({collection.symbol})
                    </h3>
                    <p className="text-sm mb-1">
                        Description: {collection.description}
                        
                    </p>
                    <p className="text-sm mb-1">
                        Token ID: {String(collection.tokenId)}
                    </p>
                    <p className="text-sm mb-1">
                        Creator: {truncateAddress(collection.tokenOwner)}
                    </p>
                    <p className="text-sm mb-1">
                        {/* {new Date(collection.createdAt).toLocaleDateString()} */}
                        Time Created: {formatRelativeTime(Number(collection.timeCreated))}
                    </p>
                    <p className="text-sm mb-1">
                        Amount Minted: {String(collection.amountMinted)}/{String(collection.maxSupply)}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">
                        Price: {weiToEther(String(collection.price))} tTRUST
                    </h3>
                    
                    {address ? (
                        <>
                            <button
                            onClick={() => {
                                handleMint(collection.tokenId, BigInt(1), collection._imageURI, collection.price)
                            }}
                            disabled={loading}
                            className="bg-black text-white block px-5 py-4 rounded-lg mb-3 cursor-pointer">
                            {loading ? "Minting..." : "Mint Token Collection"}
                            </button>
                        </>
                    ) : (
                        <button
                        disabled={true}
                        className="bg-black text-white block px-5 py-4 rounded-lg mb-3 cursor-pointer"
                        >
                        Connect Wallet To Mint
                        </button>
                    )}

                    
                </div>
                    ) : (
                        <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                        {collection.name} ({collection.symbol})
                    </h3>
                    <p className="text-sm mb-1">
                        Token ID: {String(collection.tokenId)}
                    </p>
                    <p className="text-sm mb-1">
                        Total Minted: {String(collection.totalMinted)}
                    </p>

                        </div>
                    )
                }
                
        </div>
    );
};
