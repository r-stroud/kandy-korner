import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../location/Locations"
import { ProductContainer } from "../product/ProductContainer"
import { Products } from "../product/Products"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Welcome to Kandy Korner!</h1>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<Locations />} />

				<Route path="products" element={<ProductContainer />} />

			</Route>
		</Routes>
	)
}

