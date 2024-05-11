"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTable from './components/Table';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import MyChart from './components/Chart';
import SideNav from './components/SideNav';


export default function Home() {

  interface chartInterface {
    labels: number[],
    values: number[],
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<FormData>(new FormData());
  const [chartData, setChartData] = useState<chartInterface | null>(null)


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
    additional: {},
    // floorplan: {},
    // tenant_details: {},
    images: [],
    // tables: {}
  })

  function handleChange(evt: any) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value
    });
  }

  const receiveChartData = (data: chartInterface) => {
    setChartData(data);
  };


  const toggleComponent = () => {
    setCurrentIndex((currentIndex + 1) % components.length);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFormData = new FormData(); // Create a new FormData object

      Array.from(files).forEach((file, index) => {
        newFormData.append(`image-${index}`, file); // Append each file to new FormData with unique field name
      });

      setUploadImages((prevFormData: any) => {
        // Create a new FormData object
        const mergedFormData = new FormData();

        // Append entries from the previous FormData object
        for (const [key, value] of prevFormData.entries()) {
          mergedFormData.append(key, value);
        }

        // Append entries from the new FormData object
        for (const [key, value] of newFormData.entries()) {
          mergedFormData.append(key, value);
        }

        return mergedFormData;
      });

      const newImagesArray: string[] = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImagesArray]);

    }
  }

  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:8080/photos/upload', uploadImages);
      console.log("Response" + response);

      console.log('Upload successful:', response.data);
      return { success: true, data: response.data }; // Return success
    } catch (error) {
      console.error('Error uploading:', error);
      return { success: false, error }; // Return failure
    }
  }

  function HandleTableData(data: any) {
    setTabledata(data);
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const uploadResponse = await handleUpload();
    if (uploadResponse.success) {
      axios.post('http://localhost:8080/createproperty', {
        ...formValues
      })
        .then(res => {
          if (res.data.success == true) {

            alert("lesgoo!");
          }
        })
        .catch(err => console.log(err))
    }
    else {
      alert("Couldn't upload images")
    }
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

  const components = [
    <div className="overflow-x-auto">
      <MyTable
        TableData={HandleTableData}
      />
    </div>,
    <MyChart onDataUpdate={receiveChartData} />

  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className="">
      <div className="flex h-screen bg-gray-200">
        {/* Sidebar */}
        <div
          className={`${isOpen ? "block" : "hidden"
            } w-64 bg-white border-r overflow-y-auto lg:block`}
        >
          {/* Your sidebar content goes here */}
          <div className="p-4">
            <h1 className="text-lg font-bold">Sidebar</h1>
            {/* Add your navigation links here */}
            <ul>
              <li className="py-2">
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  About
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-gray-800 hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top bar */}
          <div className="bg-white border-b">
            <button
              className="text-gray-600 lg:hidden px-4 py-3"
              onClick={toggleNav}
            >
              {/* Hamburger menu icon */}
              {isOpen ? (
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 7.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2">

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
                    <input name="photos" type='file' onChange={handleImageChange} multiple className="shadow-sm bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-4/6 p-2.5" placeholder=" " required />
                  </div>
                  <div className="relative z-0 w-full mb-8 group border-2 max-h-96 overflow-y-auto border-gray-700 rounded-md">

                    {selectedImages.map((image, index) => (
                      <div key={index}>
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
              <div className="border h-screen lg:h-5/6 border-black shadow-[inset_0_6px_10px_rgba(0,0,0,0.3)] rounded-lg m-10 p-3">
                <h1 className=' tracking-tight roboto-regular'>Preview Section</h1>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

  );
}
