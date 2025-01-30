import {
  Box,
  Heading,
  Span,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function HeroSection() {
  const textSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <>
      {hero(textSize, subTextSize)}
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
          maxW="2xl"
        >
          <Text fontSize={subTextSize}>
            I'm a Computer Scientist passionate.
          </Text>
          <Text fontSize={subTextSize}>
            🌱 I'm always excited to learn and work on projects that push the
            boundaries of technology! I love algorithms and I’m exploring game
            development with Unity and Unreal Engine.
          </Text>
          <Text fontSize={subTextSize}>
            🤔 My interests lie in stories that shape people, imagination, the
            world, me, and you. I'm diving into game development and 3D design.
          </Text>
          <Text fontSize={subTextSize}>
            💼 I’ve completed my bachelor’s degree in Computer Science.
          </Text>
          <Text fontSize={subTextSize}>
            ⚡ I'm on the lookout for Stein Gate.
          </Text>
        </VStack>
      </Box>
    </>
  );
}

const hero = (
  textSize: string | undefined,
  subTextSize: string | undefined
) => (
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
        A passionate{" "}
        <Span fontWeight="bold">Software Engineer & Game Developer </Span>,
        crafting innovative digital experiences. 🚀
      </Text>
    </VStack>
  </Box>
);
