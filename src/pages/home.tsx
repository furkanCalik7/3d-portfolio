import {
  Box,
  Heading,
  Span,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import InfoCard from "../components/ui/info-card";

export default function HomePage() {
  const textSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <div>
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
          zIndex={1}
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
          align={"start"}
          maxW="2xl"
          zIndex={1}
        >
          <Text fontSize={subTextSize}>
            I am a new grad 25 year old{" "}
            <Span fontWeight={"bold"}> game programmer</Span>.
          </Text>
          <Text fontSize={subTextSize} textAlign="justify">
            I describe myself as a{" "}
            <Span fontWeight={"bold"}>problem solver </Span>that seeks
            opportunities to learn new things, at the same time, constantly{" "}
            <Span fontWeight={"bold"}>improving my skills</Span>. I enjoy
            creating games that feel great to play, with clean code that is easy
            to read. I thrive on difficult challenges, maybe a little too much
            sometimes as I have a hard time letting go if I can not come up with
            a solution during a coding session. Want to know more? You can find
            my contact information in my resume at the top. You can also reach
            me on any of my social media.
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
          zIndex={1}
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
    </div>
  );
}
