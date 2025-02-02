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
import { Field } from "../components/ui/field"; // Ensure this path is correct
import { MdEmail, MdLocationOn } from "react-icons/md";
import InfoCard from "../components/ui/card";
import { Toaster, toaster } from "../components/ui/toaster";

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
    from_name: false,
    from_mail: false,
    message: false,
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSending(true);

    let newErrors = {
      from_name: formData.from_name == "",
      from_mail: formData.from_mail == "",
      message: formData.message == "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setIsSending(false);
      return;
    }

    console.log(formData);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData)
      .then(() => {
        toaster.create({
          description: "Message sent.",
          type: "success",
          duration: 5000,
        });

        setFormData({ from_name: "", from_mail: "", message: "" });
      })
      .catch((error) => {
        toaster.create({
          description: "Message could not be sent. Please try again later.",
          type: "error",
          duration: 5000,
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <InfoCard>
      <Flex
        maxW="100%"
        w={{ base: "100%", md: "800px" }}
        minW="40%"
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
              {/* Your Name Field */}
              <Field
                invalid={!!errors.from_name}
                required
                label="Your Name"
                errorText="Field is required"
              >
                <Input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  borderColor="gray.300"
                  value={formData.from_name}
                  onChange={handleChange}
                />
              </Field>

              {/* Email Field */}
              <Field
                invalid={!!errors.from_mail}
                required
                label="Email"
                errorText="Field is required"
              >
                <Input
                  type="email"
                  name="from_mail"
                  placeholder="Enter your email"
                  borderColor="gray.300"
                  value={formData.from_mail}
                  onChange={handleChange}
                />
              </Field>

              {/* Message Field */}
              <Field
                invalid={!!errors.message}
                required
                label="Message"
                errorText="Field is required"
              >
                <Textarea
                  name="message"
                  placeholder="Write your message here..."
                  borderColor="gray.300"
                  minH="150px"
                  resize="none"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Field>

              <Button
                type="submit"
                variant="outline"
                width="full"
                color="white"
                borderColor="white"
                _hover={{ bg: "white", borderColor: "white", color: "black" }}
                loading={isSending}
                loadingText="Sending..."
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
      <Toaster />
    </InfoCard>
  );
};

export default ContactPage;
