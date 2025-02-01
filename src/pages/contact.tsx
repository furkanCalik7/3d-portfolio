import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
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
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";

const PUBLIC_KEY = "XkJZnCjWG2trKuFpw";
const SERVICE_ID = "service_p7laon5";
const TEMPLATE_ID = "template_o6i98ou";

const ContactPage = () => {
  useEffect(() => emailjs.init(PUBLIC_KEY), []);

  const [formData, setFormData] = useState({
    from_name: "",
    from_mail: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    from_name: "",
    from_mail: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  // Handle input changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSending(true);

    let newErrors = {
      from_name: formData.from_name ? "" : "Name is required.",
      from_mail: formData.from_mail ? "" : "Email is required.",
      message: formData.message ? "" : "Message is required.",
    };

    setErrors(newErrors);

    // Stop if there are errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      setIsSending(false);
      return;
    }

    console.log(formData);

    // emailjs.send(SERVICE_ID, TEMPLATE_ID, formData).then(
    //   () => {
    //     console.log("SUCCESS!");
    //     setFormData({ from_name: "", from_mail: "", message: "" });
    //     setIsSending(false);
    //   },
    //   (error) => {
    //     console.log("FAILED...", error.text);
    //     setIsSending(false);
    //   }
    // );
  };

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
        <Flex w="100%" direction="column" textAlign="center">
          <Heading as="h1" fontSize="2xl" fontWeight="bold" color="white">
            Get in Touch
          </Heading>
          <Text fontSize="md" color="gray.300" mt={2}>
            Feel free to send me a message regarding anything that might pique
            your interest.
          </Text>
          <Text fontSize="md" color="gray.300" mt={2}>
            I'll try my best to respond within a day.
          </Text>
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
          <form onSubmit={handleSubmit}>
            <VStack w="100%">
              <FormControl isInvalid={!!errors.from_name} isRequired w="100%">
                <FormLabel mb="4px">Your Name</FormLabel>
                <Input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  borderColor="gray.300"
                  value={formData.from_name}
                  onChange={handleChange}
                />
                <FormErrorMessage mt="4px" color="red">
                  {errors.from_name}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.from_mail} isRequired w="100%">
                <FormLabel mb="4px">Email</FormLabel>
                <Input
                  type="email"
                  name="from_mail"
                  placeholder="Enter your email"
                  borderColor="gray.300"
                  value={formData.from_mail}
                  onChange={handleChange}
                />
                <FormErrorMessage mt="4px" color="red">
                  {errors.from_mail}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message} isRequired w="100%">
                <FormLabel mb="4px">Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Write your message here..."
                  borderColor="gray.300"
                  size="md"
                  minH="150px"
                  value={formData.message}
                  onChange={handleChange}
                />
                <FormErrorMessage mt="4px" color="red">
                  {errors.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                variant="outline"
                width="full"
                color="white"
                borderColor="white"
                _hover={{ bg: "white", borderColor: "white", color: "black" }}
                // isLoading={isSending}
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </InfoCard>
  );
};

export default ContactPage;
