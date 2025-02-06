import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	//{fetchProducts, products} is used to destructure the fetchProducts function and the products array from 
	// the useProductStore hook which is important because we need to access the fetchProducts function and the products array 
	// if we dont destructure the fetchProducts function and the products array then 
	// we will not be able to access the fetchProducts function and the products array
	const { fetchProducts, products } = useProductStore();

	//the useEffect hook is used to call the fetchProducts function which is required for fetching the products from the backend and storing the value in the products array
	//[fetchProducts] is used to specify that the fetchProducts function is the dependency of the useEffect hook 
	// if we dont specify this then the useEffect hook will run infinitely, with specifying this the useEffect hook will run only once.
	//if we dont use the useEffect then we need to call the fetchProducts function manually which is not a good practice
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>
				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
