import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Textarea,
  VStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { MdEmail, MdLocationOn } from "react-icons/md";
import InfoCard from "../components/ui/card";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const ContactPage = () => {
  return (
    <InfoCard>
      <Flex
        maxW="100%"
        w="100%"
        mx="auto"
        my={{ base: 0, md: 6 }}
        p={{ base: 0, md: 10 }}
        borderRadius="lg"
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(10px)"
        boxShadow="lg"
        zIndex={1}
        alignItems="center"
        flexDirection="column"
        gap={{ base: 4, md: 8 }}
        mr="8"
      >
        {/* Contact Information Section */}
        <Flex
          w="100%"
          direction="column"
          textAlign="center"
          mx={{ base: "0", md: "100px" }}
        >
          <Heading as="h1" fontSize="2xl" fontWeight="bold" color="white">
            Get in Touch
          </Heading>
          <Text fontSize="md" color="gray.300" mt={2} textAlign={"center"}>
            Feel free to send me a message regarding anything that might pique
            your interest.
          </Text>

          <Text fontSize="md" color="gray.300" mt={2} textAlign={"center"}>
            I'll try my best to respond within a day.
          </Text>
          {/* Contact Info */}
          <HStack justify="center" gap={5} mt={5}>
            <HStack>
              <MdEmail color="#ffffff" size="20px" />
              <Text color="gray.300">furkancalikk7@gmail.com</Text>
            </HStack>
            <HStack>
              <MdLocationOn color="#ffffff" size="20px" />
              <Text color="gray.300">Ankara, Turkiye</Text>
            </HStack>
          </HStack>
        </Flex>

        {/* Contact Form */}
        <Box
          bg="gray.900"
          borderRadius="lg"
          p={6}
          w={{ base: "100%", md: "70%" }}
        >
          <VStack gap={4} w="100%">
            <FormControl w="100%">
              <FormLabel mb="10">Your Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                borderColor="gray.300"
              />
            </FormControl>

            <FormControl isRequired w="100%">
              <FormLabel m="10">Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                borderColor="gray.300"
              />
            </FormControl>

            <FormControl isRequired w="100%">
              <FormLabel m="10">Message</FormLabel>
              <Textarea
                placeholder="Write your message here..."
                borderColor="gray.300"
                size="md"
                minH="150px"
              />
            </FormControl>

            <Button
              variant="outline"
              width="full"
              color="white"
              borderColor="white" // Change this to any color that contrasts well
              _hover={{ bg: "white", borderColor: "white", color: "black" }} // Add hover effect
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </Flex>
    </InfoCard>
  );
};

export default ContactPage;
