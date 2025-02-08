import { Button, Container, Flex, HStack, Text, useColorMode, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW="1140px" px={4} py={2}>
			<Flex
				h={16}
				alignItems="center"
				justifyContent="space-between"
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				{/* Logo */}
				<Text
					fontSize={{ base: "22px", sm: "28px" }}
					fontWeight="bold"
					textTransform="uppercase"
					textAlign="center"
					bgGradient="linear(to-r, cyan.400, blue.500)"
					bgClip="text"
				>
					<Link to="/">Product Store 🛒</Link>
				</Text>

				{/* Buttons */}
				<HStack spacing={4} alignItems="center">
					{/* Create Product Button */}
					<Link to="/create">
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>

					<Link to="/cart">
						<Button>
							<FiShoppingCart fontSize={20} />
						</Button>
					</Link>

					{/* Dark Mode Toggle */}
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
