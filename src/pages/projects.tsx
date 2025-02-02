import {
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import InfoCard from "../components/ui/info-card";

const ProjectsPage = () => {
  const textSize = useBreakpointValue({ base: "2xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  const imageSrc = useBreakpointValue({
    base: new URL("/sandrix/logo-play-store.png", import.meta.url).href,
    md: new URL("/sandrix/sandrix-portrait.png", import.meta.url).href,
  });

  const pickupLines = useBreakpointValue({
    base: new URL("/pickup-lines/logo-play-store.png", import.meta.url).href,
    md: new URL("/pickup-lines/pickup-portrait.png", import.meta.url).href,
  });

  return (
    <>
      <InfoCard>
        <Flex
          maxW={{ base: "100%", md: "50%" }}
          w="100%"
          mx="auto"
          p={{ base: 10, md: 6 }}
          borderRadius="lg"
          bg="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          zIndex={1}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          ml={{ base: "0", md: "10" }}
          gap={{ base: 4, md: 8 }}
        >
          <Image
            flex="1"
            zIndex="1"
            alt="sandrix image"
            maxW={{ base: "70%", md: "40%" }}
            height={{ base: "auto", md: "450px" }}
            src={imageSrc}
            objectFit="contain"
          />

          <Flex
            flex="1"
            direction="column"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading as="h1" fontSize={textSize} fontWeight="bold">
              Sandrix
            </Heading>
            <Text fontSize={subTextSize} textAlign="justify">
              Sandrix is a unique twist on the classic Tetris formula, blending
              physics-based gameplay with strategic block placement. In this 2D
              puzzle game, each falling piece is filled with dynamic, flowing
              sand, creating new challenges and possibilities as you stack and
              arrange them. The game features a grid-based system where the
              weight and movement of sand influence how pieces settle, break
              apart, or merge, requiring players to think beyond traditional
              Tetris mechanics.
            </Text>

            <Link
              href="https://play.google.com/store/apps/details?id=com.yourcompany.sandrix"
              mt={4}
              alignSelf={{ base: "center", md: "flex-start" }}
            >
              <Image
                src={new URL("/google-play-badge.png", import.meta.url).href}
                alt="Get it on Google Play"
                maxW={{ base: "120px", md: "160px" }}
              />
            </Link>
          </Flex>
        </Flex>
      </InfoCard>

      <InfoCard>
        <Flex
          maxW={{ base: "100%", md: "50%" }}
          w="100%"
          mx="auto"
          p={{ base: 10, md: 6 }}
          borderRadius="lg"
          bg="rgba(0, 0, 0, 0.6)"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          zIndex={1}
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          ml={{ base: "0", md: "10" }}
          gap={{ base: 4, md: 8 }}
        >
          <Image
            flex="1"
            zIndex="1"
            alt="pickup lines image"
            maxW={{ base: "70%", md: "40%" }}
            height={{ base: "base", md: "450px" }}
            src={pickupLines}
            objectFit="contain"
          />

          <Flex
            flex="1"
            direction="column"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading as="h1" fontSize={textSize} fontWeight="bold">
              Pickup Lines
            </Heading>
            <Text fontSize={subTextSize} textAlign="justify">
              This project is a personal hobby project designed to learn and
              practice Flutter while also publishing an app on Google Play. The
              app, Pickup Lines, offers a diverse collection of pickup lines
              across various categories. Users can explore and select their
              favorite lines, which they can either share as an image or copy to
              use. The app is developed using Flutter, a powerful framework for
              building natively compiled applications for mobile from a single
              codebase.
            </Text>

            <Link
              href="https://play.google.com/store/apps/details?id=com.yourcompany.sandrix"
              mt={4}
              alignSelf={{ base: "center", md: "flex-start" }}
            >
              <Image
                src={new URL("/google-play-badge.png", import.meta.url).href}
                alt="Get it on Google Play"
                maxW={{ base: "120px", md: "160px" }}
              />
            </Link>
          </Flex>
        </Flex>
      </InfoCard>
    </>
  );
};

export default ProjectsPage;
