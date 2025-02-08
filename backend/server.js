import express from "express";
import dotenv from "dotenv";
// import path from "path";
// import cors from "cors";

import { connectDB } from "./config/db.js";

//productRoutes is a middleware that is defined in 
// routes/product.route.js in the form of a function named router.
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

//loads environment variables from a .env file into process.env 
// that helps us to access the environment variables and their values 
// and use them in our application in the form of process.env.VARIABLE_NAME
//without this we would have to hard code the values in the application 
// example: PORT=5000 where as in this case it works as process.env.PORT
dotenv.config();

//creates an express application that is used to set up middlewares and routes
//calling the express function returns an express application 
// if we dont use this we would have to create an http server and set up the routes and middlewares
//example: const app = http.createServer((req, res) => { ... });
//currently it replaces the need for the http module and provides a simpler way to set up the server
//it is important to have this because it is the core of the application in the form of a server as it listens to the requests and sends responses example: app.get, app.post
//if we wouldnt have this at all we wouldnt be able to set up the server and the application wouldnt work
//the frontend and backend wouldnt be able to communicate with each other
//with using this the frontend can send requests to the backend and the backend can send responses to the frontend 
// using the app.get, app.post, app.put, app.delete which are the HTTP methods
const app = express();

const PORT = process.env.PORT || 5001;

//__dirname is a global object that provides the directory name of the current module 
// which is used to resolve the path to the frontend as it is important for the server to know 
// where the frontend is located with the help of which it can serve the static files 
// via the express.static middleware which is useful for the application in the form of the 
// frontend/dist/index.html as it helps the application to serve the static files and the 
// index.html file to the client side
//const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body
//app.use(cors());

//app.use is a method that is used to set up middlewares in the express application the middlewares
//the /api/products , productRoutes is a middleware that is defined in routes/product.route.js in the form of a function named router.
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
