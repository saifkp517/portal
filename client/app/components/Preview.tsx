'use client'

import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Paper, Button } from '@mui/material'

export default function Preview({details}: any) {

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
    // You can add your logic for form submission here
  };

  const images = [
    {
      image: "/briagadetechpark1.png",
      alt: "visuals"
    },
    {
      image: "/briadetechpark2.png",
      alt: "visuals"
    },
    {
      image: "/briadetechpark3.png",
      alt: "visuals"
    },
    {
      image: "/briadetechpark4.png",
      alt: "visuals"
    },

  ]

  return (
    <div className="">
      <div className="max-w-screen-xl my-24 mx-auto">
        <h1 className="text-center mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-6xl ">Brigade Tech Park</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="m-8 lg:m-0 col-span-2 ">
            <Image
              src={"/briagadetechpark1.png"}
              alt={"main"}
              width={1000}
              height={1000}
              className="object-contain mx-auto rounded-xl border-black border"
            />
          </div>
          <div className="">
            <h1 className=" font-bold text-2xl tracking-tight  o text-center text-gray-700">ENQUIRE NOW</h1>
            <div className="h-full text-center">
              <iframe className="mx-auto h-48 mt-6" src="https://lottie.host/embed/ceb864b7-efa4-43ab-8df9-05d32c8d3503/z0ZkrFx1D8.json"></iframe>
              <button className="bg-blueTheme border border-gray-600 rounded-lg py-2 px-4 text-white mt-8" onClick={openModal}>Interested?</button>
              {/* <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                  overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  content: {
                    width: '90%',
                    zIndex: 50,
                    height: '70%', // Increased height
                    padding: '0',
                    marginTop: '5%',
                    borderRadius: '10px', // Adjust the value as needed
                    top: '50%', // Center vertically
                    transform: 'translateY(-50%)', // Center vertically
                  }
                }}
                contentLabel="Example Modal"
              >
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="container hidden lg:flex">
                      <Image alt="getintouch" src="/getintouch.jpg" height={1000} width={1000} className=" h-full object-fit" />
                    </div>
                    <div className=" col-span-2 p-12">
                      <h1 className="text-2xl font-bold text-gray-700">Get in Touch</h1>
                      <p className=" o mt-2 text-gray-400">Have an inquiry to discuss about project? Fill out the form our team will contact you</p>
                    </div>
                  </div>
                </div>
              </Modal> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl my-24 mx-auto">
        <Typography variant="h3" className="text-center text-2xl lg:text-5xl font-extrabold tracking-tighter text-blueTheme">INVESTMENT DETAILS</Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 mt-16 max-w-screen-sm  lg:max-w-screen-lg mx-6 lg:mx-auto border-2 p-2 lg:p-10 border-blue-300 rounded-lg ">
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Building Name</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">Brigade Tech Park</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Asset Type</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">Grade A</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Investment Floor</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">5th out of 9</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Lease Lock-in</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">August 2027</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Gross Entry Yield</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">9%</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Target IRR</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">16.13</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Multiplier</h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">1.8</p>
          </div>
          <div className="">
            <h1 className="text-md lg:text-xl  font-bold text-center text-gray-600">Minimum Investment </h1>
            <p className="text-lg lg:text-2xl font-bold text-center text-blueTheme">25 Lacs</p>
          </div>

        </div>

        <div className="grid grid-cols-2 mx-4 lg:mx-16 gap-x-8 mt-16 lg:mt-24">
          <div className="">
            <Typography variant="h5" className=" font-bold text-gray-600">Location and Tenant</Typography>
            <h1 className="text-gray-700">Strategic Location</h1>
            <h1 className="text-blueTheme font-bold">Whitefield, Bengaluru</h1>
            <hr className="w-1/3 my-4 " />
            <h1 className="text-gray-700">Marquee Tenant</h1>
            <h1 className="text-blueTheme font-bold">Creative Synergies Consulting India Pvt Ltd</h1>
          </div>
          <div className="text-sm tracking-tighter text-gray-600 mx-2 lg:mx-8">
            <   Typography variant="h5" className=" font-bold text-blueTheme underline">Overview</Typography>
            <br />
            <p>
              Great Opportunity to invest in the 5th floor of a A+ Grade Office space strategically situated on the ITPL main road in Whitefield, Bengaluru. The proposed investment in 32300 sqft of the Brigade Tech Park, Tower B.
            </p>
            <br />
            <p>
              The entire floor is leased to Creative Synergies Consulting Pvt. Ltd. A global digital innovation solution provider wit more than 40+ Fortune 500 clients and lcation in 20+ countries.
            </p>
          </div>
        </div>
        <div className=" mt-14 lg:mt-24 mx-4 lg:mx-16">
          <Typography variant="h5" className="mb-8 font-bold text-gray-600">Floor Plan</Typography>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div className="col-span-2">
              <Image width={1500} height={1500} className="object-contain w-fit" src={'/floorplanbrigade.png'} alt="FloorPlan" />
            </div>
            <div className="col-span-1">
              <Typography variant="h5" className=" font-bold text-blueTheme ">Features</Typography>
              <ul className=" list-disc leading-1 lg:leading-10 list-outside">
                <li><h1>Stylish Reception Areas</h1></li>
                <li><h1>300 Roomy Workstations on Every Floor</h1></li>
                <li><h1>Well-Equipped Meeting spaces</h1></li>
                <li><h1>6-Seater Conference Rooms</h1></li>
                <li><h1>4-Seater Meeting Rooms</h1></li>
                <li><h1>10-Seater Conference Rooms</h1></li>
                <li><h1>Professional 22-Seater Board Room</h1></li>
                <li><h1>Classic Pantry Area</h1></li>
                <li><h1>Relaxing Wellness Room</h1></li>
                <li><h1>Convenient Male and Female Restrooms on Each Floor</h1></li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" mt-14 lg:mt-24 mx-4 lg:mx-16">
          {/* <Typography variant="h5" className=" font-bold text-gray-600">Property Visuals</Typography>
          <div className="mx-auto mt-8 w-full -z-20">
            <Carousel>
              {
                images.map((image) => (
                  <Image
                    key={image.image}
                    src={image.image}
                    alt={image.alt}
                    width={5000}
                    height={5000}
                    className="object-contain w-full"
                    draggable={false}
                    loading="lazy"
                  />
                ))
              }
            </Carousel>
          </div> */}
        </div>
        <div className=" mt-14 lg:mt-24 mx-4 lg:mx-16">
          <Typography variant="h5" className=" font-bold text-gray-600">Purchase Details</Typography>
          <Typography><span className="text-blueTheme font-bold">Note: </span>Purchase Price Calculated with per sqft rate of 8,675</Typography>
          <div className="mx-auto mt-8">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-white uppercase bg-blueTheme">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Particulars
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Purhase Price
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      28,02,02,500
                    </td>
                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      + Stamp Duty
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      18,633,466
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      + Legal & Structuring Expenses
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      1,500,000
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      + Acquisition Fee
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      9,500,000
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      + Reserves
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      164,034
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Net Price
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      310,000,000
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div className=" mt-14 lg:mt-24 mx-4 lg:mx-16">
          <Typography variant="h5" className=" font-bold text-gray-600">Lease Overview</Typography>
          <div className="mx-auto mt-8">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-white uppercase bg-blueTheme">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Particulars
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Starting rental
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      56
                    </td>
                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Security deposit
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      16279200
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Average rent/sft/month
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      61.3
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Holding Period
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      5 Years
                    </td>

                  </tr>
                  <tr className=" ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Average Annual Escalation
                    </th>
                    <td className="px-3 lg:px-6 py-2 lg:py-4">
                      5% YOY
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
        <div className=" mt-14 lg:mt-24 mx-4 lg:mx-16">
          <Typography variant="h5" className=" font-bold text-gray-600">CASH FLOWS</Typography>
          <div className="mx-auto mt-8">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-2 ">
                <thead className="text-xs text-white uppercase bg-blueTheme">
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">YEAR 0</th>
                  <th className="px-6 py-3 border-x-2">YEAR 1 </th>
                  <th className="px-6 py-3 border-x-2">YEAR 2</th>
                  <th className="px-6 py-3 border-x-2">YEAR 3</th>
                  <th className="px-6 py-3 border-x-2">YEAR 4</th>
                  <th className="px-6 py-3 border-x-2">YEAR 5</th>
                </thead>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Investment</th>
                  <th className="px-6 py-3 border-x-2">25,00,000</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2"></th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Total Rent</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">1,75,045</th>
                  <th className="px-6 py-3 border-x-2">1,78,171</th>
                  <th className="px-6 py-3 border-x-2">1,87,548</th>
                  <th className="px-6 py-3 border-x-2">2,03,490</th>
                  <th className="px-6 py-3 border-x-2">2,13,664</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2">Credit</th>
                  <th className="px-6 py-3 border-x-2">Car Park Rent</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">7,742</th>
                  <th className="px-6 py-3 border-x-2">7,935</th>
                  <th className="px-6 py-3 border-x-2">8,332</th>
                  <th className="px-6 py-3 border-x-2">8,535</th>
                  <th className="px-6 py-3 border-x-2">8,535</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Bonus</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">33,000</th>
                  <th className="px-6 py-3 border-x-2">12,500</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Interest on Deposits</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">9,282</th>
                  <th className="px-6 py-3 border-x-2">9,282</th>
                  <th className="px-6 py-3 border-x-2">9,282</th>
                  <th className="px-6 py-3 border-x-2">9,282</th>
                  <th className="px-6 py-3 border-x-2">9,282</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Gross Yield</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">2,25,070</th>
                  <th className="px-6 py-3 border-x-2">2,07,889</th>
                  <th className="px-6 py-3 border-x-2">2,05,163</th>
                  <th className="px-6 py-3 border-x-2">2,21,308</th>
                  <th className="px-6 py-3 border-x-2">2,31,482</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2">Debit</th>
                  <th className="px-6 py-3 border-x-2">Management Fee</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">-25,000</th>
                  <th className="px-6 py-3 border-x-2">-25,000</th>
                  <th className="px-6 py-3 border-x-2">-25,000</th>
                  <th className="px-6 py-3 border-x-2">-25,000</th>
                  <th className="px-6 py-3 border-x-2">-25,000</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Property tax &amp; Others</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">-7,460</th>
                  <th className="px-6 py-3 border-x-2">-7,460</th>
                  <th className="px-6 py-3 border-x-2">-7,460</th>
                  <th className="px-6 py-3 border-x-2">-7,460</th>
                  <th className="px-6 py-3 border-x-2">-7,460</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2">Returns</th>
                  <th className="px-6 py-3 border-x-2">Surplus Reserves</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">1,323</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Sale Proceeds</th>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">-</th>
                  <th className="px-6 py-3 border-x-2">36,73,320</th>
                </tr>
                <tr>
                  <th className="px-6 py-3 border-x-2"></th>
                  <th className="px-6 py-3 border-x-2">Net Cash Flow</th>
                  <th className="px-6 py-3 border-x-2">-25,00,000</th>
                  <th className="px-6 py-3 border-x-2">1,92,610</th>
                  <th className="px-6 py-3 border-x-2">1,75,429</th>
                  <th className="px-6 py-3 border-x-2">1,72,703</th>
                  <th className="px-6 py-3 border-x-2">1,88,848</th>
                  <th className="px-6 py-3 border-x-2">38,73,666</th>
                </tr>
              </table>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}
