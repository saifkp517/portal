
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from "next/image"
import { useState } from "react";
import axios from 'axios';

export default function PropertyCard({sendChangedComponent, id, name, image, location, funded, invamt, irr }: any) {


    function deletProperty()
    {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/delete/${id}`)
        .then(res => {
            console.log(res);
            alert(res.data.message)
            window.location.reload();
        })
        .catch(e => {
            console.log(e)
        })
    }

    const href = name.split(" ").join("_").toLowerCase();

    return (
        <div className="mx-auto max-h-full">
            <div className="static w-80 bg-card border shadow-lg shadow-gray-700 border-blue-300 rounded-lg  ">
                <div className="flex flex-col items-center">
                    <div className=" w-11/12 m-4 h-48  relative ">
                        <Image fill unoptimized className="object-fill border border-black rounded-xl" src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${image}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-between px-4">
                        <h5 className="mb-2 text-2xl font-bold    tracking-tighter text-gray-600 line-clamp-1">{name}</h5>
                        <div className="flex">
                            {/* <LocationOnIcon className=" text-red-500" /> */}
                            <p className="text-md mb-3 font-bold tracking-tighter  text-gray-800 ">{location}</p>
                        </div>

                        <div className="w-5/6 mx-auto">
                            <div className="bg-gray-300  h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-r-3xl" style={{ width: `${funded}%` }}></div>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-xs">
                                <div className="text-gray-600">Funded {funded}%</div>
                                <div className="text-gray-600">100%</div>
                            </div>
                        </div>
                        <div className="grid mt-4 grid-cols-3 gap-5 text font-bold    tracking-tighter leading-tight">
                            <div className="text-center ">
                                <h1 className="font-bold text-lg text-gray-600">{invamt} Lakhs</h1>
                            </div>
                            <div className="text-center ">
                                <h1 className="font-bold text-lg text-gray-600">{irr}%</h1>
                            </div>
                            <div className="text-center mt-2">
                                <div className="flex space-x-1">
                                    <div className="bg-green-500 h-2 w-4"></div>
                                    <div className="bg-green-300 h-2 w-4"></div>
                                    <div className=" bg-red-300 h-2 w-4"></div>
                                    <div className="bg-red-500 h-2 w-4"></div>
                                    <div className="bg-red-700 h-2 w-4"></div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 mb-4 text-md font-bold font-robot tracking-tight leading-tight">
                            <div className="text-center ">
                                <sub className="text-xs">Investment Amount</sub>
                            </div>
                            <div className="text-center ">
                                <sub className="text-xs">IRR</sub>
                            </div>
                            <div className="text-center">
                                <sub className="text-xs">Risk Factor</sub>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <button onClick={() => sendChangedComponent(`edit/${id}`)} className='mx-auto w-full mb-4 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white tracking-tight'>
                                Edit
                            </button>
                            <button onClick={deletProperty} className='mx-auto w-full mb-4 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white tracking-tight'>
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div >


    )
}
