import { useEffect, useState } from "react";
import { ProductForm } from "./ProductForm";
import { Products } from "./Products";

export const ProductContainer = () => {

    const [condition, setCondition] = useState(false)
    const [viewForm, setViewForm] = useState(false)

    return <>
        <button onClick={
            () => {
                setViewForm(!viewForm)
            }
        }>New Product Entry</button>
        {viewForm ? <>
            <ProductForm setProp={setCondition} prop={condition} setView={setViewForm} view={viewForm} />
        </> : <>
        </>

        }


        <Products prop={condition} />
    </>
}