import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


export const addToCart = async (req, res) => {
    const receivedProduct = req.body.product;
    const { _id: pid } = receivedProduct;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ success: false, message: "hello" });
    }

    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne();
        if (!cart) cart = new Cart({ items: [] });

        const existingItem = cart.items.find((item) => item.product.toString() === pid);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ success: true, data: cart });
    }
    catch (error) {
        console.log("error in adding to cart:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne().populate("items.product");
        if (!cart) {
            cart = new Cart({ items: [] });
            await cart.save();
        }
        res.status(200).json({ success: true, data: cart });
    }
    catch (error) {
        console.log("Error fetching cart:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === id);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1); // Remove item completely
        }
        await cart.save();
        res.status(200).json({ success: true, data: cart });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (!cart) return res.status(200).json({ success: true, message: "Cart already empty" });

        cart.items = [];
        await cart.save();

        res.status(200).json({ success: true, message: "Cart cleared" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
