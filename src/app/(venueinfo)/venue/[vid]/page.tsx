import Image from "next/image"
import getVenue from "@/libs/getVenue"

export default async function VenueDetailPage({params}: {params: any}) {

    const venueDetail = await getVenue(params.vid)
    /**
     * Mock Date for Democonstration Only
     */
    /*
    const mockVenueRepo = new Map();
    mockVenueRepo.set("001",{name:"The Bloom Pavilion",image:"/img/bloom.jpg"})
    mockVenueRepo.set("002",{name:"Spark Space",image:"/img/sparkspace.jpg"})
    mockVenueRepo.set("003",{name:"The Grand Table",image:"/img/grandtable.jpg"})
    */

    const vid = params?.vid ?? "001"
    //const venue = mockVenueRepo.get(vid)
    
    return (
      <main className="text-center p-5">
        <h1 className="text-2xl font-bold">{venueDetail.data.name}</h1>
        <div className="flex flex-row my-5 gap-6">
            <Image src={venueDetail.data.picture}
                  alt="Venue Image"
                  width={0} height={0} sizes="100vw"
                  className="rounded-lg w-[30%] font-bold"
            />
            <div className="text-md mx-5 text-left ml-16">{venueDetail.data.name}
            <div className="text-md mx-5">Address : {venueDetail.data.address}</div>
            <div className="text-md mx-5">District : {venueDetail.data.district}</div>
            <div className="text-md mx-5">Postal Code : {venueDetail.data.postalcode}</div>
            <div className="text-md mx-5">Tel : {venueDetail.data.tel}</div>
            <div className="text-md mx-5">Daily Rate : {venueDetail.data.dailyrate}</div>
            </div>
        </div>
      </main>
    );
}

// export async function generateStaticParams() {
//     return [{vid:'001'}, {vid:'002'}, {vid:'003'}];
// }
