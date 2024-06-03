'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface FormValues {
  building_name: string;
  asset_type: string;
  investment_size: string;
  lockin: string;
  entry_yeild: string;
  irr: string;
  multiplier: string;
  minimum_investment: string;
  location: string;
  tenant: string;
  overview: string;
  additional: {
    heading: string;
    description: string;
    data: Record<string, unknown>;
  };
  images: string[];
  userId: string;
}

export default function EditSection() {

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_DOMAIN}/property/dc2db305-86f8-4e37-8be8-71be25e04d7a`); // Replace with your API endpoint
        console.log(response.data)
        const data = response.data.property;
        setFormValues({
          building_name: data.building_name,
          asset_type: data.asset_type,
          investment_size: data.investment_size,
          lockin: data.lockin,
          entry_yeild: data.entry_yeild,
          irr: data.irr,
          multiplier: data.multiplier,
          minimum_investment: data.minimum_investment,
          location: data.location,
          tenant: data.tenant,
          overview: data.overview,
          additional: data.additional,
          images: data.images,
          userId: data.userId,
        });
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchPropertyData(); 
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    building_name: '',
    asset_type: '',
    investment_size: '',
    lockin: '',
    entry_yeild: '',
    irr: '',
    multiplier: '',
    minimum_investment: '',
    location: '',
    tenant: '',
    overview: '',
    additional: { heading: '', description: '', data: {} },
    images: [],
    userId: ''
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newSelectedImages = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(newSelectedImages);

      // For uploading
      // You might need to store the files in state as well if you want to upload them later
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('images', image); // Adjust this based on your API's expected field name
      });

      const response = await axios.post(`${process.env.SERVER_DOMAIN}/photos/upload`, formData);
      console.log('Upload successful:', response.data);

      const imagePaths: string[] = response.data.files.map((file: any) => file.path);

      setFormValues((prevValues) => ({
        ...prevValues,
        images: imagePaths,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error uploading:', error);
      return { success: false, error };
    } 
  };

  
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const uploadResult = await handleUpload();
    if (uploadResult.success) {
      // Handle successful upload, e.g., submit the form data to another API endpoint
      console.log('Form submitted successfully with uploaded images.');
    } else {
      // Handle upload error
      console.log('Failed to upload images.');
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="mt-14 max-w-screen-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
          <input
            name="building_name"
            value={formValues.building_name}
            onChange={handleChange}
            type="text"
            className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" "
            required
          />
        </div>
        <div className="grid md:grid-cols-4 md:gap-6 mb-5">
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Asset Type</label>
            <input
              name="asset_type"
              value={formValues.asset_type}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Investment Size(sq.ft)</label>
            <input
              name="investment_size"
              value={formValues.investment_size}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Lock In Period</label>
            <input
              name="lockin"
              value={formValues.lockin}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Target IRR</label>
            <input
              name="irr"
              value={formValues.irr}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Gross Entry Yield</label>
            <input
              name="entry_yeild"
              value={formValues.entry_yeild}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Multiplier</label>
            <input
              name="multiplier"
              value={formValues.multiplier}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Minimum Investment</label>
            <input
              name="minimum_investment"
              value={formValues.minimum_investment}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
            <input
              name="location"
              value={formValues.location}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 w-full mb-0 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Tenant</label>
            <input
              name="tenant"
              value={formValues.tenant}
              onChange={handleChange}
              type="text"
              className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              required
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <label className="block mb-2 text-sm font-medium text-gray-900">Overview</label>
          <textarea
            name="overview"
            value={formValues.overview}
            onChange={handleChange}
            className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" "
            required
          />
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <label className="block mb-2 text-sm font-medium text-gray-900">Property Visuals</label>
          <input
            name="photos"
            type="file"
            onChange={handleImageChange}
            multiple
            className="shadow-sm border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-4/6 p-2.5"
            placeholder=" "
            required
          />
        </div>
        <div className="relative min-h-28 z-0 w-full mb-8 group border-2 max-h-96 overflow-y-auto border-gray-700 rounded-md">
        {selectedImages.map((image, index) => (
                <div key={index} className="relative inline-block">
                  <Image
                    src={image}
                    className="object-cover h-1/2 w-1/2 rounded-lg m-3"
                    alt={`Image ${index}`}
                    width={500} // Adjust as needed
                    height={200} // Adjust as needed
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

