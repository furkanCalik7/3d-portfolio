"use client";

import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Icons for GitHub, LinkedIn, and Resume
import { MdDownload } from "react-icons/md";

interface Props {
  children?: React.ReactNode;
}

const Links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { children } = props;

  const handleResumeDownload = () => {
    const resumeUrl = "/cv.pdf";
    window.open(resumeUrl, "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/furkanCalik7", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/furkancalik/", "_blank");
  };

  return (
    <>
      <Box
        bg="black"
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack gap={8} alignItems="center">
            <HStack as="nav" gap={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <Button
                  key={link.name}
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </Button>
              ))}
            </HStack>
          </HStack>

          {/* Right Side: Resume, GitHub, LinkedIn Buttons */}
          <HStack gap={4}>
            {/* Resume Download Button */}
            {/* GitHub Button */}
            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.700", borderColor: "white" }}
              onClick={handleGitHubClick}
            >
              <FaGithub />
            </IconButton>

            {/* LinkedIn Button */}

            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.700", borderColor: "white" }}
              // borderColor="white"
              variant="ghost"
              onClick={handleLinkedInClick}
            >
              <FaLinkedin />
            </IconButton>
            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.800", borderColor: "white" }}
              onClick={handleResumeDownload}
              px="4"
              variant="outline"
              borderStyle="solid"
              borderColor="white"
            >
              Resume
              <MdDownload></MdDownload>
            </IconButton>
          </HStack>
        </Flex>
      </Box>
      {children}
    </>
  );
};

export default Navbar;
