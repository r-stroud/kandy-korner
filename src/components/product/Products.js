import { useEffect, useState } from "react";
import "./Products.css"
import { ProductForm } from "./ProductForm";

export const Products = ({ prop }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [locations, setLocations] = useState([])

    const [filterPrice, setFilterPrice] = useState(false)

    const [filterExpensive, setFilterExpensive] = useState(false)

    const [filterName, setFilterName] = useState(false)

    // const [viewForm, setViewForm] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const fetchProducts = async () => {
                const fetchData = await fetch("http://localhost:8088/products?_expand=productType")
                const fetchJson = await fetchData.json()
                setProducts(fetchJson)
            }
            fetchProducts()
        },
        [, prop]
    )

    useEffect(
        () => {
            const sort = products.map(product => ({ ...product }))
            if (filterName) {
                setFilteredProducts(sort.sort((a, b) => a.name.localeCompare(b.name, "en-us", { ignorePunctuation: true })))
            } else {
                setFilteredProducts(sort.sort((a, b) => b.name.localeCompare(a.name, "en-us", { ignorePunctuation: true })))
            }
        },
        [filterName]
    )

    useEffect(
        () => {
            const sort = products.map(product => ({ ...product }))
            const sorted = sort.sort((a, b) => { return b.price - a.price })
            const sortArray = []

            sortArray.push(sorted[0])

            if (filterExpensive) {
                setFilteredProducts(sortArray)
            } else {
                setFilteredProducts(products)
            }

        },
        [filterExpensive]

    )

    useEffect(
        () => {
            const sort = products.map(product => ({ ...product }))
            if (filterPrice) {

                setFilteredProducts(sort.sort((a, b) => { return b.price - a.price }))

            } else {
                setFilteredProducts(sort.sort((a, b) => { return a.price - b.price }))
            }

        },
        [filterPrice]
    )

    useEffect(
        () => {
            const fetchLocations = async () => {
                const fetchData = await fetch("http://localhost:8088/locationProducts?_expand=products&_expand=locations")
                const fetchJson = await fetchData.json()
                setLocations(fetchJson)
            }
            fetchLocations()
        },
        [products]
    )

    useEffect(
        () => {
            if (kandyUserObject.staff) {
                setFilteredProducts(products)
            }
        },
        [products]
    )

    // const locationsArray = locations.map(location => ({ ...location }))

    // const availableLocations = (arrayLocation, arrayProduct) => {
    //     const locations = arrayLocation.filter((item) => arrayProduct.includes(item.id))
    //     const filterArray = []

    //     locations.forEach(item => filterArray.push({
    //         id: item.id,
    //         address: item.address,

    //     }))

    //     return <>
    //         <ul>{filterArray.map(item => {
    //             return <div key={`taco--${item.id}`}>
    //                 <li>{item.address}</li></div>
    //         })}</ul>
    //     </>
    // }

    const locationsFunction = (array) => {
        const sortedLocations = locations.filter(location => location.products.id === array.id)
        return <div key={`locations--${array.id}`}>{sortedLocations.map(sorted => <div><li>{sorted.locations.address}</li></div>)}</div>
    }

    return <>

        <section className="allTheButtons">

            <div className="button_container">
                <button id="filterByPrice" onClick={
                    () => {
                        setFilterPrice(!filterPrice)
                        setFilterExpensive(false)
                    }
                }>
                    Filter By Price</button>

                <button id="filterByExpense" onClick={
                    () => {
                        setFilterExpensive(!filterExpensive)
                    }
                }>
                    Most Expensive Item</button>
            </div>

            <div className="button_container">
                <button id="filterByName" onClick={
                    () => {
                        setFilterName(!filterName)
                        setFilterExpensive(false)
                    }
                }>
                    Filter By Name</button>

            </div>

        </section>

        <section className="cardContainer product_cardContainer">



            {
                filteredProducts.map(product => {
                    return <div className="product_card card" key={`product--${product.id}`}>
                        <h2>Product ID: {product.id}</h2>
                        <h2>{product.name}</h2>
                        <h3>${parseInt(product.price)}</h3>
                        <h3>{product.productType.type}</h3>
                        <h3>Available At The Following Locations:</h3>
                        <ul>{locationsFunction(product)}
                        </ul>
                    </div>
                })
            }
        </section>
    </>

}





