
import Image from "next/image"
import PropertyCard from "../PropertyCard";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import axios from "axios";

export default function MyProperties({ name, image, location, funded, invamt, irr }: any) {


    const [propDetails, setPropDetails] = useState<any>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/properties')
        .then(res => {
            console.log(res.data.properties)
            setPropDetails(res.data.properties)
        })
    }, []);

    return (
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Uploaded Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propDetails.map((property: any) => (
                <PropertyCard
                    key={property.building_name}
                    name={property.building_name}
                    image={property.images[0]}
                    location={property.location}
                    funded={8}
                    invamt={property.minimum_investment}
                    irr={property.irr}
                />
            ))}
        </div>
        {/* Additional details section */}
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {/* Add more details here as needed */}
        </div>
    </div>


    )
}
