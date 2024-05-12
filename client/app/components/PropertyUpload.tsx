"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTable from './tools/Table';
import { Editor } from "@tinymce/tinymce-react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import MyChart from './tools/Chart';
import Preview from './Preview';

export default function PropertyUpload() {

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

  interface AdditionalData {
    chart?: any;
    table?: any;
  }

  type FormValues = {
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
    additional: AdditionalData;
    images: any[]; // Adjust the type for images if needed
  };


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

  return (

    <div className="">
      <div className="grid grid-cols-2">

        <div className="">
          <form onSubmit={submitHandler} className=" mt-14 max-w-screen-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <input name="building_name" value={formValues.building_name} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


            </div>
            <div className="grid md:grid-cols-4 md:gap-6 mb-5">
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Asset Type</label>
                <input name="asset_type" value={formValues.asset_type} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Investment Size(sq.ft)</label>
                <input name="investment_size" value={formValues.investment_size} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Lock In Period</label>
                <input name="lockin" value={formValues.lockin} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Target IRR</label>
                <input name="irr" value={formValues.irr} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Multiplier</label>
                <input name="multiplier" value={formValues.multiplier} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Minimum Investment</label>
                <input name="minimum_investment" value={formValues.minimum_investment} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <input name="location" value={formValues.location} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
              <div className="relative z-0 w-full mb-0 group">
                <label className="block mb-2 text-sm font-medium text-gray-900">Tenant</label>
                <input name="tenant" value={formValues.tenant} onChange={handleChange} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " required />


              </div>
            </div>
            <div className="relative z-0 w-full mb-8 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Building Name</label>
              <textarea name="overview" value={formValues.overview} onChange={handleChange} className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />

            </div>
            <div className="relative z-0 w-full mb-8 group">
              <label className="block mb-2 text-sm font-medium text-gray-900">Property Visuals</label>
              <input name="photos" type='file' onChange={handleImageChange} multiple className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-4/6 p-2.5" placeholder=" " required />
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

            <div className='text-center'>
              <button type='button' className='py-2 px-4 border border-black rounded-lg hover:bg-slate-500 hover:text-white hover:border-transparent' onClick={toggleComponent}>Toggle ToolBox</button>
              <div className="border-2 border-gray-600 rounded-lg p-4 m-4">{components[currentIndex]}</div>
            </div>

            <div className="my-3 text-center">
              <button type='button' onClick={appendData} className='bg-green-500 px-7 py-2 rounded-lg text-white font-bold'>Add Detail</button>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Submit</button>
          </form>


        </div>
        <div className="border h-screen bg-white lg:h-5/6 border-black shadow-[inset_0_6px_10px_rgba(0,0,0,0.3)] rounded-lg m-10 p-3">
          <h1 className=' tracking-tight roboto-regular'>Content Preview</h1>
          <br />


          <div className='detail'>
            <h1 className="text-center text-xl robot-regular tracking-tight font-bold text-gray-700">{formValues.building_name}</h1>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 mt-2 max-w-screen-sm lg:max-w-screen-lg mx-6 lg:mx-auto border-2 p-2 lg:p-8 border-blue-300 rounded-lg ">
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Building Name</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">"{formValues.building_name}"</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Asset Type</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.asset_type}</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Investment Floor</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.investment_size}</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Lease Lock-in</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.lockin}</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Gross Entry Yield</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.entry_yeild}%</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Target IRR</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.irr}%</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Multiplier</h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.multiplier}%</p>
              </div>
              <div className="">
                <h1 className="text-md lg:text-sm  font-bold text-center text-gray-600">Minimum Investment </h1>
                <p className="text-lg lg:text-sm font-bold text-center text-blue-500">{formValues.minimum_investment} Lacs</p>
              </div>

            </div>
            <div className="grid grid-cols-2 mx-0 lg:mx-4 mt-4 lg:mt-8">
              <div className="">
                <h1 className=" font-bold text-gray-600">Location and Tenant</h1>
                <h1 className="text-gray-700">Strategic Location</h1>
                <h1 className="text-blueTheme font-bold">{formValues.location}</h1>
                <hr className="w-1/3 my-2 " />
                <h1 className="text-gray-700">Marquee Tenant</h1>
                <h1 className="text-blueTheme font-bold">{formValues.tenant}</h1>
              </div>
              <div className="text-sm tracking-tighter text-gray-600 mx-2">
                <h1 className=" font-bold text-blueTheme text-lg mb-2 underline">Overview</h1>
                <p className='break-words'>
                  {formValues.overview}
                </p>



              </div>
            </div>
            <div className="chart">
              {
                formValues.additional.chart ?
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          color: 'black',
                          text: 'Rental Yeild Growth',
                          padding: 10,
                          fullSize: true,
                          font: {
                            weight: 'bold',
                            size: 24
                          }
                        },
                      },
                    }}
                    data={{
                      labels: formValues.additional.chart.labels,
                      datasets: [
                        {
                          label: 'Growth Yeild',
                          data: formValues.additional.chart.values.map((value: any) => parseInt(value)),
                          backgroundColor: ['#50C878', '#228B22'],
                          barPercentage: 0.5,
                        },
                      ],
                    }}
                  />
                  :
                  "jeasd"
              }
            </div>
          </div>




        </div>
      </div>
    </div>

  );
}
