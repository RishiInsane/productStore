import { Box, Text, Image, Button, HStack } from "@chakra-ui/react";
import { useCartStore } from "../store/cart";
import { useToast } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

const CartItemCard = ({ item }) => {
  const { deleteCartItem } = useCartStore();
  const toast = useToast();

  const handleDelete = async (productId) => {
    const { success, message } = await deleteCartItem(productId);
    toast({
      title: success ? "Item Removed" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bgGradient="linear(to-r, gray.50, gray.100)"
    >
      <Flex align="center">
        {/* Product Image */}
        <Image
          src={item.product.image}
          alt={item.product.name}
          borderRadius="md"
          boxSize="80px"
          objectFit="cover"
          mr={4}
        />

        {/* Product Details */}
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {item.product.name}
          </Text>
          <Text fontSize="md" color="gray.600">
            ${item.product.price} x {item.quantity}
          </Text>
        </Box>

        {/* Spacer to push button to the right */}
        <Spacer />

        {/* Remove Button */}
        <HStack>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => handleDelete(item.product._id)}
            _hover={{ bg: "red.600" }}
          >
            🗑 Remove
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CartItemCard;
