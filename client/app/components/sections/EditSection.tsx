'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CategoryScale, Chart } from "chart.js";
import { Bar } from 'react-chartjs-2';

import MyChart from '../tools/Chart';
import MyTable from '../tools/Table';

export default function EditSection({ id }: any) {

  Chart.register(CategoryScale);




  interface chartInterface {
    labels: number[],
    values: number[],
  }

  const [formValues, setFormValues] = useState<any>({
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

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('')
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tableData, setTabledata] = useState<any>([]);
  const [chartData, setChartData] = useState<chartInterface | null>(null)

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/property/${id}`); // Replace with your API endpoint
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
  }, [id]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function HandleTableData(data: any) {
    setTabledata(data);
  }

  const receiveChartData = (data: chartInterface) => {
    setChartData(data);
  };

  const components = [
    <div className="overflow-x-auto">
      <MyTable
        TableData={HandleTableData}
      />
    </div>,
    <MyChart onDataUpdate={receiveChartData} />
  ];

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

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/photos/upload`, formData);
      console.log('Upload successful:', response.data);

      const imagePaths: string[] = response.data.files.map((file: any) => file.path);

      setFormValues((prevValues: any) => ({
        ...prevValues,
        images: imagePaths,
      }));

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error uploading:', error);
      return { success: false, error };
    }
  };

  const toggleComponent = () => {
    setCurrentIndex((currentIndex + 1) % components.length);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  function handleRemoveTool(toolkey: string) {
    setFormValues((prevValues: any) => {
      const updatedAdditional = { ...prevValues.additional };

      delete updatedAdditional[toolkey];

      return {
        ...prevValues,
        additional: updatedAdditional
      }
    })
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

        <div className='text-center'>
          <button type='button' className='py-2 px-4 border border-black rounded-lg hover:bg-slate-500 hover:text-white hover:border-transparent' onClick={toggleComponent}>Toggle ToolBox</button>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm text-start font-medium text-gray-900">Heading</label>
            <input name="heading" value={heading} onChange={e => setHeading(e.target.value)} type="text" className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " />


          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm text-start font-medium text-gray-900">Desciption</label>
            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} className="shadow-sm  border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" " ></textarea>


          </div>
          <div className="border-2 border-gray-600 rounded-lg p-4 m-4">{components[currentIndex]}</div>
        </div>


        <div className="border h-screen overflow-y-auto bg-white lg:h-5/6 border-black shadow-[inset_0_6px_10px_rgba(0,0,0,0.3)] rounded-lg m-10 p-3">


          <div className='detail'>
            <div className="chart p-4">

              {
                Object.keys(formValues.additional).map(key => {
                  if (key.startsWith("chart-")) {
                    const chartData = formValues.additional[key].data;
                    console.log(chartData)
                    if (chartData && chartData.labels && chartData.values) {
                      return (
                        <div className="border-black hover:border p-2 hover:rounded-lg">
                          <h1 className='font-bold text-lg text-green-500'>{formValues.additional[key].heading}</h1>
                          <p className=''>{formValues.additional[key].description}</p>
                          <div className="relative w-full h-full">
                            <Bar
                              key={key} // Make sure to set a unique key for each chart
                              className=''
                              options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: 'top' as const,
                                  },
                                  title: {
                                    display: true,
                                    color: 'black',
                                    text: 'Rental Yield Growth',
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
                                labels: chartData.labels,
                                datasets: [
                                  {
                                    label: 'Growth Yield',
                                    data: chartData.values.map((value: any) => parseFloat(value)),
                                    backgroundColor: ['#50C878', '#228B22'],
                                    barPercentage: 0.5,
                                  },
                                ],
                              }}
                            />
                            <button
                              onClick={() => handleRemoveTool(key)}
                              className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    }
                  }
                  else if (key.startsWith("table-")) {
                    const tableData = formValues.additional[key].data;
                    if (tableData) {
                      return (
                        <div className="my-4 overflow-auto border-black hover:border p-2 hover:rounded-lg">
                          <div className="relative w-full h-full">
                            <h1 className='font-bold text-lg text-green-500'>{formValues.additional[key].heading}</h1>
                            <p className=''>{formValues.additional[key].description}</p>
                            <table className="table-fixed rounded-lg border-collapse bg-white">
                              <tbody>
                                {tableData.map((row: any, rowIndex: number) => (
                                  rowIndex == 0 ? (
                                    <tr key={rowIndex}>
                                      {row.map((cell: any, colIndex: number) => (
                                        <th className="border border-black bg-green-500 text-white px-4 py-2" key={colIndex}>
                                          {cell}
                                        </th>
                                      ))}
                                    </tr>
                                  )
                                    :
                                    (
                                      <tr key={rowIndex}>
                                        {row.map((cell: any, colIndex: number) => (
                                          <td className="border border-black px-4 py-2" key={colIndex}>
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    )
                                ))}
                              </tbody>
                            </table>
                            <button
                              onClick={() => handleRemoveTool(key)}
                              className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    }

                  }
                  return null; // Return null if chart data is not available
                })
              }
            </div>

          </div>




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

