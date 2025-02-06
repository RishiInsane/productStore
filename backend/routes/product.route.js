import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

// create a new router object which is a middleware and routing system 
// helps to create modular, mountable route handlers that is useful for separating routes into different files
// the express.router class can be used to create route handlers the other way is to use app.get, app.post, app.put, app.delete
const router = express.Router();

//when the router.get is called it will call the getProducts function 
// from the product.controller.js similarly for the other routes
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
