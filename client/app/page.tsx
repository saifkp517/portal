"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTable from './components/Table';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import MyChart from './components/Chart';


export default function Home() {

  interface chartInterface {
    labels: number[],
    values: number[],
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [chartData, setChartData] = useState<chartInterface | null>(null)
  const receiveChartData = (data: chartInterface) => {
    setChartData(data);
  };

  const toggleComponent = () => {
    setCurrentIndex((currentIndex + 1) % components.length);
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImagesArray: string[] = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImagesArray]);
      console.log()
    }
  }

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    })

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Images uploaded successfully!');
        // Optionally, perform any additional actions after successful upload
      } else {
        alert('Error uploading images');
      }
    }
    catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    }

  }

  const components = [
    <div className="overflow-x-auto">
      <MyTable
        TableData={HandleTableData}
      />
    </div>,
    <MyChart onDataUpdate={receiveChartData} />

  ];

  const [tableData, setTabledata] = useState<any>([]);
  const [inputType, setinputType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState({});


  const [formValues, setFormValues] = useState({
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
    additional: {}
    // floorplan: {},
    // tenant_details: {},
    // images: [],
    // tables: {}
  })

  function handleChange(evt: any) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value
    });
  }



  function HandleTableData(data: any) {
    setTabledata(data);
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post('http://localhost:8080/createproperty', {
      ...formValues
    })
      .then(res => {
        if (res.data.success == true) {
          alert("lesgoo!")
        }
      })
      .catch(err => console.log(err))
  }

  function appendData() {
    setFormValues(prevState => ({
      ...prevState,
      additional: {
        ...prevState.additional,
        [currentIndex == 0 ? 'table' : 'chart']: currentIndex == 0 ? tableData : chartData
      }
    }))

  }


  return (

    <div className="grid grid-cols-2">
      <div className="">
        <form onSubmit={submitHandler} className=" mt-14 max-w-screen-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
            <input name="building_name" value={formValues.building_name} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


          </div>
          <div className="grid md:grid-cols-4 md:gap-6 mb-5">
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="asset_type" value={formValues.asset_type} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="investment_size" value={formValues.investment_size} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="lockin" value={formValues.lockin} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="irr" value={formValues.irr} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="multiplier" value={formValues.multiplier} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="minimum_investment" value={formValues.minimum_investment} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="location" value={formValues.location} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="relative z-0 w-full mb-0 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="tenant" value={formValues.tenant} onChange={handleChange} type="text" className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
          </div>
          <div className="relative z-0 w-full mb-8 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
            <textarea name="overview" value={formValues.overview} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />

          </div>
          <div className="relative z-0 w-full mb-8 group">
            <label className="block mb-2 text-sm font-medium text-gray-900">Property Visuals</label>
            <input name="overview" type='file' onChange={handleImageChange} multiple className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-4/6 p-2.5" placeholder=" " required />
          </div>
          <div className="relative z-0 w-full mb-8 group border-2 h-1/2 border-gray-700 rounded-md">

            {selectedImages.map((image, index) => (
              <div className='flex' key={index}>
                <Image
                  src={image}
                  className='object-cover h-1/2 w-1/2 rounded-lg m-3'
                  alt={`Image ${index}`}
                  width={500} // Adjust as needed
                  height={200} // Adjust as needed
                />
              </div>
            ))}
          </div>


          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Submit</button>
        </form>

        <div className='text-center my-24'>
          <button className='py-2 px-4 border border-black rounded-lg hover:bg-slate-500 hover:text-white hover:border-transparent' onClick={toggleComponent}>Toggle ToolBox</button>
          <div className="border-2 border-gray-600 rounded-lg p-4 m-4">{components[currentIndex]}</div>
        </div>

        <div className="my-3 text-center">
          <button onClick={appendData} className='bg-green-500 px-7 py-2 rounded-lg text-white font-bold'>Add Detail</button>
        </div>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </div>
      <div className="border border-black rounded-lg m-10 p-3">
        <h1>Preview Section</h1>
      </div>
    </div>
  );
}
