
import Image from "next/image"
import PropertyCard from "../PropertyCard";
import { useEffect } from "react";

export default function MyProperties({ name, image, location, funded, invamt, irr }: any) {

    useEffect(() => {
        
    })

    const propDetails = [
        {
            name: "Brigade Tech Park",
            image: "briagadetechpark1.png",
            location: "Whitefield, Bangaluru",
            funded: 4,
            invamt: "25",
            irr: "16.13"
        },
        {
            name: "Sky One Opportunity",
            image: "skyoneopportunity.png",
            location: "Viman Nagar, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.1"
        },
        {
            name: "NASDAQ & NYSE Listed MNC's",
            image: "nysemnc.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
        {
            name: "Jaipur Logstics Park",
            image: "jaipurlogisticspark.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
        {
            name: "Brigade Tech Park",
            image: "briagadetechpark1.png",
            location: "Whitefield, Bangaluru",
            funded: 4,
            invamt: "25",
            irr: "16.13"
        },
        {
            name: "Sky One Opportunity",
            image: "skyoneopportunity.png",
            location: "Viman Nagar, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.1"
        },
        {
            name: "NASDAQ & NYSE Listed MNC's",
            image: "nysemnc.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
        {
            name: "Jaipur Logstics Park",
            image: "jaipurlogisticspark.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
        {
            name: "Brigade Tech Park",
            image: "briagadetechpark1.png",
            location: "Whitefield, Bangaluru",
            funded: 4,
            invamt: "25",
            irr: "16.13"
        },
        {
            name: "Sky One Opportunity",
            image: "skyoneopportunity.png",
            location: "Viman Nagar, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.1"
        },
        {
            name: "NASDAQ & NYSE Listed MNC's",
            image: "nysemnc.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
        {
            name: "Jaipur Logstics Park",
            image: "jaipurlogisticspark.png",
            location: "Magarpatta, Pune",
            funded: 5,
            invamt: "25",
            irr: "15.15"
        },
    ]

    return (
        <div className="grid gap-28 max-w-screen-xl grid-cols-4 min-h-screen">
            {/* <PropertyCard  */}
            {
                propDetails.map(property => (
                    <div key={property.name}>
                        <PropertyCard
                            name={property.name}
                            image={property.image}
                            location={property.location}
                            funded={property.funded}
                            invamt={property.invamt}
                            irr={property.irr}
                        />
                    </div>
                ))
            }
        </div >


    )
}
