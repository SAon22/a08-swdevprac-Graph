import Card from "@/components/Card";
import Link from "next/link";

export default function VenueCatalog({venuesJson} : {venuesJson:any}) {

    return (
        <>
        Explore {venuesJson.count} fabulous venues in our venue catalog
        <div style={{margin:"20px", display:"flex", 
            flexDirection:"row", alignContent:"space-around", 
            justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
                {
                    venuesJson.data.map((venueItem:any) => (
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5" key={venueItem.id}>
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                    </Link>
                    ))
                }
        </div>
        </>
    )
}
