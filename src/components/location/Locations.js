import { useEffect, useState } from "react"

export const Locations = () => {

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            const fetchLocations = async () => {
                const fetchData = await fetch("http://localhost:8088/locations")
                const fetchJson = await fetchData.json()
                setLocations(fetchJson)
            }
            fetchLocations()
        },
        []
    )


    return <>
        <section className="cardContainer location_cardContainer">
            {
                locations.map(location => {
                    return <>
                        <div className="location_card card" key={`location--${location.id}`}>
                            <h2>Location # {location.id}</h2>
                            <h3>{location.address}</h3>
                            <h3>{location.squareFootage} Square Feet</h3>
                        </div>
                    </>
                })
            }
        </section>
    </>
}