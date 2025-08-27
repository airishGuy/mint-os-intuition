// @ts-nocheck
"use client"

import { CollectionsGrid } from '@/components/CollectionsGrid';
import React, { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi';
import ERC1155Launchpad from '@/abi/ERC1155Launchpad.json';


const page = () => {

    const [nfts, setNFTs] = useState<Array<MintedTokenDetails>>([]);
    const { address } = useAccount();

     const { data, refetch, isLoading} = useReadContract({
            address: ERC1155Launchpad.address as `0x${string}`,
            abi: ERC1155Launchpad.abi,
            functionName: "getUserTokens",
            args: [address],
    });
    
   interface MintedTokenDetails {
        tokenId: bigint;
        name: string;
        symbol: string;
        description: string;
        imageURI: string;
        totalMinted: bigint;
    }



    useEffect(() => {
          refetch().then(res => {
            console.log(res.data);
            setNFTs(res.data)
      })
        }, []);
  return (
    <div>
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* <div className='font-bold'>MY NFTS</div> */}
                            {/* Your collections grid/list will go here */}
                            {
                                !isLoading && (
                                    <CollectionsGrid
                                        title="My Minted NFTs"
                                        collections={nfts}
                                        showPrice={false}
                                    />
                                )
                            }
            </div>
        </div>
    </div>
  )
}

export default page;