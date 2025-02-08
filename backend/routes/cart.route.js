import express from "express";
import { getCart, addToCart, deleteCartItem, clearCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", deleteCartItem);
router.delete("/", clearCart);

export default router;