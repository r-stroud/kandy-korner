import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const ProductForm = ({ setProp, prop, view, setView }) => {

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const [productType, setProductType] = useState([])
    const [condition, setCondition] = useState(false)

    useEffect(
        () => {
            const fetchProductType = async () => {
                const fetchData = await fetch("http://localhost:8088/productTypes")
                const fetchJson = await fetchData.json()
                setProductType(fetchJson)
            }

            fetchProductType()
        }, []
    )


    const [productEntry, updateProduct] = useState({
        name: "",
        price: "",
        type: ""
    })


    const postFunction = async () => {

        const productTypeToAPI = {
            type: productEntry.type,
        }

        const fetchType = await fetch("http://localhost:8088/productTypes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productTypeToAPI)
        })
        const fetchJsonType = await fetchType.json()

        const productToSendToAPI = {
            name: productEntry.name,
            price: productEntry.price,
            productTypeId: fetchJsonType.id
        }

        const fetchProduct = await fetch("http://localhost:8088/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productToSendToAPI)
        })
        const fetchJsonProduct = await fetchProduct.json()

        setProp(!prop)

    }


    const clickFunction = (event) => {
        event.preventDefault()

        const productTypeMap = productType.map(x => x.type)

        console.log(productType)
        console.log(productEntry)
        if (productTypeMap.includes(productEntry.type)) {
            alert("Entry already exists!")

        } else {
            postFunction()
            setView(!view)

        }

    }

    return <>
        <form>
            <div>New Product Entry Form</div>
            <label htmlFor="productName">Product Name: </label>
            <input type="text" id="productName" required placeholder="text"
                onChange={
                    (evt) => {
                        const copy = { ...productEntry }
                        copy.name = evt.target.value
                        updateProduct(copy)
                    }

                } />
            <label htmlFor="productType">Product Type: </label>
            <input type="text" id="productType" required placeholder="text"
                onChange={
                    (evt) => {
                        const copy = { ...productEntry }
                        copy.type = evt.target.value
                        updateProduct(copy)

                    }
                } />
            <label htmlFor="productCost">Product Cost: </label>
            <input type="number" id="productCost" step="any" min="1" required placeholder="number"
                onChange={
                    (evt) => {
                        const copy = { ...productEntry }
                        copy.price = evt.target.value
                        updateProduct(copy)
                    }
                } />
            <button id="submitForm"
                onClick={(clickEvent) => {
                    clickFunction(clickEvent)
                }}
            >Submit</button>
        </form>
    </>
}