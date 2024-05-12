"use client"

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      color: 'black',
      text: 'Rental Yeild Growth',
      padding: 20,
      fullSize: true,
      font: {
        weight: 'bold',
        size: 24
      }
    },
  },
};

export default function MyChart({onDataUpdate}: any) {

  const [chartData, setchartData] = useState({
    labels: [],
    values: []
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setchartData({
      ...chartData,
      [name]: value.split(',')
    })
    onDataUpdate(chartData)
  }

 const data = {
  labels: chartData.labels,
  datasets: [
    {
      label: 'Growth Yeild',
      data: chartData.values.map(value => parseInt(value)),
      backgroundColor:  ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#00BFFF', '#FFD700', '#32CD32', '#8A2BE2'],
      barPercentage: 0.5,
    },
  ],
};

  return (

    <div className="text-black max-w-screen-lg  mx-auto">
      <div className="grid gap-y-6">
        <div className="relative z-0 w-1/2 mx-auto  mb-0 group">
          <input value={chartData.labels.join(',')} name="labels" onChange={handleChange} type="text" className="block py-3.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Labels</label>
        </div>
        <div className="relative z-0 w-1/2 mx-auto  mb-0 group">
          <input value={chartData.values.join(',')} name="values" onChange={handleChange} type="text" className="block py-3.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Values</label>
        </div>
      </div>
      <Bar options={options} data={data} />;
    </div>
  );
}
