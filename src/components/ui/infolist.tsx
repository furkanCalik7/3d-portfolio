import {
  Box,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function HeroSection() {
  const textSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <Box
      height="100vh"
      width="100%"
      bgGradient="linear(to-r, #0F2027, #203A43, #2C5364)" // Dark gradient background
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={6}
    >
      <VStack
        gap={6}
        p={6}
        _open={{
          animation: "fade-in 1000ms ease-out",
        }}
        borderRadius="lg"
        bg="rgba(0, 0, 0, 0.6)" // Transparent background for readability
        backdropFilter="blur(10px)" // Glassmorphism effect
        boxShadow="lg"
        data-state="open"
      >
        <Heading as="h1" fontSize={textSize} fontWeight="bold">
          Hi, I'm Furkan 👋
        </Heading>
        <Text fontSize={subTextSize} maxW="2xl">
          A passionate **Software Engineer & Game Developer**, crafting
          innovative digital experiences. 🚀
        </Text>
      </VStack>
    </Box>
  );
}
