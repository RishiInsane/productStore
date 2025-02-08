import { Box, Button, Heading, VStack, Text, useToast, Spinner, Divider, Flex } from "@chakra-ui/react";
import { useCartStore } from "../store/cart";
import CartItemCard from "../components/CartItemCard";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";


const CartPage = () => {
    const { fetchCart, items, clearCart } = useCartStore();
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                await fetchCart();
            } catch (err) {
                setError("Failed to load cart. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, [fetchCart]);

    const handleClearCart = async () => {
        try {
            await clearCart();
            toast({
                title: "Cart Cleared",
                description: "All items have been removed",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to clear the cart",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Flex h="80vh" align="center" justify="center">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    return (
        <Container maxW="container.md" py={12}>
            <VStack spacing={8}>

                {/* Shopping Cart Heading with Gradient */}
                <Heading
                    fontSize="3xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, gray.400, gray.600)"
                    bgClip="text"
                    textAlign="center"
                >
                    🛒 Shopping Cart
                </Heading>

                {/* Error Message */}
                {error && (
                    <Text color="red.500" fontSize="lg" textAlign="center" fontWeight="bold">
                        {error}
                    </Text>
                )}

                {/* Cart Items or Empty Message */}
                {items.length === 0 ? (
                    <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                        Your cart is empty 😢
                    </Text>
                ) : (
                    <VStack spacing={6} align="stretch" w="full">
                        {items
                            .filter((item) => item?.product)
                            .map((item) => (
                                <CartItemCard key={item.product._id} item={item} />
                            ))}

                        <Divider />

                        {/* Clear Cart Button */}
                        <Button
                            colorScheme="red"
                            size="lg"
                            onClick={handleClearCart}
                            _hover={{ bg: "red.600" }}
                            width="full"
                        >
                            🗑️ Clear Cart
                        </Button>
                    </VStack>
                )}
            </VStack>
        </Container>
    );
};

export default CartPage;