// @ts-nocheck
import React, { useEffect } from 'react';
import { CollectionCard } from './CollectionCard';


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

interface CollectionsProps {
    title: String;
    collections: Collection[];
    showPrice: boolean;
}

   interface MintedTokenDetails {
        tokenId: bigint;
        name: string;
        symbol: string;
        description: string;
        imageURI: string;
        totalMinted: bigint;
    }

    interface MintedTokenDetailsProps {
        title: String;
        collections: MintedTokenDetails[];
        showPrice: boolean;
    }

export const CollectionsGrid: React.FC<CollectionsProps | MintedTokenDetailsProps> = ({
    title,
    collections,
    showPrice
}) => {

    useEffect(() => {
        console.log({collections})
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 text-white">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.tokenId}
                        collection={collection}
                        showPrice={showPrice}
                    />
                ))}
            </div>
        </div>
    );
};
