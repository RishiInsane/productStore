import mongoose from "mongoose";
import Product from "../models/product.model.js";

//the difference between this and the frontend is that the backend is using mongoose to interact with the database 
// while in the frontend, the front-end is using fetch to send requests to the backend 
// via the server using the api routes which are defined in the backend 
// the frontend interacts with the database with the server as the middleman 
// as the server is the only one that can interact with the database.
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	//helps to create a new product object with the help of the function constructor 
	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	//checks for a valid product id with the help of the mongoose library in the backend.
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		//the passed parameters such as id, product and {new:true} are passed to the findByIdAndUpdate function 
		// because it is an async function and it helps to update the product with the new data.
		// The variable new is set to true because we want to return the updated product to the client with changes in the database.
		// if the new is set to false it will return the old product to the client with changes in the database.
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
