'use client'
import { useReducer, useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import getVenues from "@/libs/getVenues";

function ratingReducer(state: Map<string, number>, action: { type: string, venue: string, rating?: number }) {

    const newState = new Map(state)

    switch(action.type) {
        case "set":
        if(action.rating !== undefined) {
            newState.set(action.venue, action.rating);
        }
        return newState;
        case "remove":
            newState.delete(action.venue);
            return newState;
        default:
            return state;
    }
}

export default function CardPanel() {

    const [venueResponse, setVenueResponse] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    }, [])

    
    const initialState = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const [ratings, dispatch] = useReducer(ratingReducer, initialState);

    /**
     * Mock Data for Demonstration
     */
    /*
    const mockVenueRepo = [
        { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
        { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
        { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" }
    ];
    */

    if(!venueResponse) return (<p>Venue Panel is Loading ...</p>)

    return (
        <div style={{margin:"20px", display:"flex", 
        flexDirection:"row", alignContent:"space-around", 
        justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
            {
                venueResponse.data.map((venueItem:any) => (
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                    <Card key={venueItem.id} venueName={venueItem.name} imgSrc={venueItem.picture}
                    rating={ratings.get(venueItem.name)}
                    onRatingChange={(value:number) => dispatch({type: "set", venue: venueItem.name, rating: value})}
                    />
                    </Link>
                ))
            }
        <div style={{width:"100%", marginTop:"20px"}}>
        <div>Venue List with Ratings : {ratings.size}</div>
        {Array.from(ratings.entries()).map(([venue, rating]) => (<div key={venue} data-testid={venue}
        onClick={() => dispatch({type:"remove", venue:venue})} style={{cursor:"pointer"}}
        >{venue} Rating : {rating}</div>))}
        </div>

</div>

    );
}