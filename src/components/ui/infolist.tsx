import {
  Box,
  Heading,
  Span,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import InfoCard from "./card";

export default function HeroSection() {
  const textSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <>
      <InfoCard>
        <VStack
          gap={6}
          p={6}
          _open={{
            animation: "fade-in 1000ms ease-out",
          }}
          borderRadius="lg"
          bg="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(10px)"
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
      </InfoCard>
      <InfoCard>
        <VStack
          gap={6}
          p={6}
          _open={{
            animation: "fade-in 1000ms ease-out",
          }}
          borderRadius="lg"
          bg="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          data-state="open"
          maxW="2xl"
        >
          <Text fontSize={subTextSize}>
            🚀 Always eager to learn and take on new challenges, I’m currently
            diving into game development with Unity and Unreal Engine.
          </Text>
          <Text fontSize={subTextSize}>
            🎮 My passion lies in crafting immersive experiences through game
            development, 3D design, and computer graphics.
          </Text>
          <Text fontSize={subTextSize}>
            ✨ I’m fascinated by stories that shape people, spark imagination,
            and bring worlds to life.
          </Text>
          <Text fontSize={subTextSize}>
            🎓 I hold a Bachelor's degree in Computer Science from Bilkent
            University.
          </Text>
          <Text fontSize={subTextSize}>
            🔍 Currently, I'm on a quest to discover{" "}
            <Span fontWeight="bold">Steins;Gate </Span>.
          </Text>
        </VStack>
      </InfoCard>
      <InfoCard>
        <VStack
          gap={4}
          p={6}
          align="start"
          borderRadius="lg"
          bg="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          maxW="2xl"
        >
          <Text fontSize={subTextSize} textAlign="left">
            <Span fontWeight="bold">1999</Span> &nbsp;&nbsp;Born in Turkey.
          </Text>

          <Text fontSize={subTextSize} textAlign="left">
            <Span fontWeight="bold">2024</Span> &nbsp;&nbsp;Completed Computer
            Science at Bilkent University with high honors.
          </Text>

          <Text fontSize={subTextSize} textAlign="left">
            <Span fontWeight="bold">2022 - 2024</Span> &nbsp;&nbsp;Part-time
            Software Developer at Siemens, working on web applications with
            Angular, Spring Boot, and Docker.
          </Text>

          <Text fontSize={subTextSize} textAlign="left">
            <Span fontWeight="bold">2023</Span> &nbsp;&nbsp;Game Development
            Intern at TaleWorlds, using Unity, Unreal Engine, and Python.
          </Text>

          <Text fontSize={subTextSize} textAlign="left">
            <Span fontWeight="bold">Present</Span> &nbsp;&nbsp;Exploring game
            development, 3D design, and computer graphics.
          </Text>
        </VStack>
      </InfoCard>
    </>
  );
}
