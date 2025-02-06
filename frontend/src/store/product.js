import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	// helps to reflect changes to the client-side/local state in react application
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				//MIME type of the request, 
				//tells the server what kind of request is being sent in this case JSON data
				//this helps the server to understand how to interpret the incoming data
				//standardises communication between front-end and back-end
				"Content-Type": "application/json",
			},
			//converts the object to a JSON string and sends the data to the server
			body: JSON.stringify(newProduct),
		});
		//parses the response to javaScript object
		const data = await res.json();
		//sets the state without needing to refresh the page
		//the function copies the current state and updates/appends the products array with the new product
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	//it is different from the backend as it is used to fetch the products from the server, 
	// the server sends requests to the database to fetch the products in the form of a GET request 
	// examle: GET /api/products which receives the products from the database and sends it to 
	// the client side in the form of a response in the form of a JSON object which is then used to 
	// update the state in the client side without needing to refresh the page
	fetchProducts: async () => {
		// the fetch("/api/products") sends a GET request to the server 
		// to fetch all products in the database, 
		// here the /products means the route in the server which is defined in the server.js file 
		// named as products which in itself correponds to the 
		// productRoutes middleware in the routes/product.route.js file which is a function named router 
		// that is used for the CRUD operations.
		// if we dont use this we would have to hard code the values in 
		// the application example: fetch("http://localhost:5000/api/products")
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		//it only allows the products that are not equal to the pid to be displayed
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({

			//if the product id is equal to the pid then the product is updated with the new data which gets stored in the database
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
