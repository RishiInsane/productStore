import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);
//creates a model called Product with the schema productSchema in the 
//database in the collection products 
//and stores it in the variable Product which is used in the controller as it helps us to interact with the database
//it is with the help of Product that we can perform CRUD operations on the database
const Product = mongoose.model("Product", productSchema);

//is used for exporting the model so that it can be used in other files
//it is exported as default because it is the only thing that is being exported from this file 
// had there been other files that needed to be exported 
// then they would have been exported as named exports example export {Product, User} where Product and User are named exports.
export default Product;
