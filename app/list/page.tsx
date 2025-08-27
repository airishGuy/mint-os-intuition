// @ts-nocheck
'use client';

import React, { useState, FormEvent } from 'react';
import { FormInput } from '@/components/FormInput';
import { FormTextArea } from '@/components/FormTextArea';
import { ImagePreview } from '@/components/ImagePreview';
import { etherToWei, getImageURI, normalizeScientificNotation } from '@/utils';
import { ethers } from 'ethers';
import ERC1155Launchpad from '@/abi/ERC1155Launchpad.json';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

interface ExistingData {
    collections: any[]
}

const page: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);


    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        description: '',
        price: '',
        totalSupply: '',
    });


    const { writeContractAsync, isPending, isSuccess } = useWriteContract();


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const createCollectionFunc = async(e: FormEvent) => {
        e.preventDefault();

        if (
            !(
                formData.name &&
                formData.symbol &&
                formData.description &&
                formData.price &&
                formData.totalSupply &&
                imageFile
            )
        )
        return;

        const priceInWei = etherToWei(formData.price);
        console.log({name: formData.name, symbol: formData.symbol, description: formData.description, price: priceInWei, totalSupply: formData.totalSupply});

        try {


            setLoading(true);
            setLoadingMessage("Pinning image to IPFS..");
            const _imageURI = await getImageURI(imageFile);
            console.log(_imageURI);
            setLoadingMessage("Creating token collection");

            await writeContractAsync({
                address: ERC1155Launchpad.address,
                abi: ERC1155Launchpad.abi,
                functionName: "createCollection",
                args: [formData.name, formData.symbol, formData.description, priceInWei, formData.totalSupply, _imageURI]
            });
            setLoading(false);
            setLoadingMessage("");
            toast.success('Token Collection created successfully....');
        } catch(err: any) {
            // close toast
            console.log({errorMessage: err})
            toast.error('Something went wrong. Please try again...');
            console.log(err);
        } finally {
            // after form submission
            setFormData({
                name: '',
                symbol: '',
                description: '',
                price: '',
                totalSupply: '',
            })
            setImageFile(null)
            
        }
  

        
    };


    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4">
  <h1 className="text-xl font-semibold mb-6 text-white">
    Create New Token Collection
  </h1>

  <form className="p-8" onSubmit={createCollectionFunc}>
    <FormInput
      label="Name"
      type="text"
      id="name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
    />

    <FormInput
      label="Symbol"
      type="text"
      id="symbol"
      value={formData.symbol}
      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
      required
    />

    <FormTextArea
      label="Description"
      id="description"
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      required
    />

    <div className="mb-4">
      <label className="block text-sm font-medium text-white mb-1">
        Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full p-2 text-sm bg-black/50 border border-white/20 rounded-lg text-white"
        required
      />
      <ImagePreview file={imageFile} />
    </div>

    <FormInput
      label="Price IN STT (e.g 0.01)"
      type="number"
      id="price"
      value={formData.price}
      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      required
      min={0}
      step="0.000001"
    />

    <FormInput
      label="Total Supply"
      type="number"
      id="totalSupply"
      value={formData.totalSupply}
      onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
      required
      min={1}
    />

    {
        loadingMessage && (
            <p className='p-4 bg-white text-black'>{loadingMessage}</p>
        )
    }
    

    <button
      type="submit"
      className="w-full mt-4 text-sm font-medium py-4 rounded bg-black text-white"
    >
        { loading ? "Creating..." : "Create Collection"}
      
    </button>
  </form>
</div>
        </div>
    );
};

export default page;
