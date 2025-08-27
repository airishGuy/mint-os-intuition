// @ts-nocheck
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { CollectionsGrid } from './CollectionsGrid';
import { useReadContract } from 'wagmi';
import ERC1155Launchpad from '@/abi/ERC1155Launchpad.json';

const CollectionsPage = () => {


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [collections, setCollections] = useState<Array<Collection>>([]);


    const { data, refetch, isLoading} = useReadContract({
        address: ERC1155Launchpad.address as `0x${string}`,
        abi: ERC1155Launchpad.abi,
        functionName: "getAllCollections",
        args: [],
    });

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




    useEffect(() => {
      console.log({collections});
      console.log(data);
      console.log(ERC1155Launchpad.address);
      refetch().then(res => {
        console.log(res.data);
        setCollections(res.data)
      })
    }, [/*collections*/]);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* <div className='font-bold'>COLLECTIONS</div> */}

            {
                !isLoading && (
                    <CollectionsGrid
                        title="ERC-1155 Collections"
                        collections={collections}
                        showPrice={true}
                    />
                )
            }
        </div>
    );
};

export default CollectionsPage;