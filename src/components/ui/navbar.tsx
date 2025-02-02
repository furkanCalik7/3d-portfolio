"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Icons for GitHub, LinkedIn, and Resume
import { MdDownload, MdMenu } from "react-icons/md"; // Icons for menu and close
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./menu";

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
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleResumeDownload = () => {
    const resumeUrl = `${import.meta.env.BASE_URL}cv.pdf`;
    window.open(resumeUrl, "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/furkanCalik7", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/furkancalik/", "_blank");
  };

  function HandleMenuOnSelect(details: any): void {
    navigate(details.value);
  }

  return (
    <>
      <Box
        bg="black"
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={5}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {isMobile && (
            <MenuRoot onSelect={HandleMenuOnSelect}>
              <MenuTrigger asChild>
                <Button
                  variant="outline"
                  _hover={{ borderColor: "white" }}
                  size="sm"
                  bg="black"
                >
                  <MdMenu></MdMenu>
                </Button>
              </MenuTrigger>
              <MenuContent zIndex="4">
                <MenuItem value=" ">Home</MenuItem>
                <MenuItem value="projects">Projects</MenuItem>
                <MenuItem value="contact">Contact</MenuItem>
              </MenuContent>
            </MenuRoot>
          )}

          <HStack
            gap={8}
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <HStack as="nav" gap={4}>
              {Links.map((link) => (
                <Button
                  key={link.name}
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.800", borderColor: "white" }}
                  onClick={() => navigate(link.path)}
                  variant="ghost"
                  onMouseDown={(e) => e.preventDefault()} // Prevents focus retention
                >
                  {link.name}
                </Button>
              ))}
            </HStack>
          </HStack>
          {/* Right Side: Resume, GitHub, LinkedIn Buttons */}
          <HStack gap={4}>
            {/* GitHub Button */}
            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.800", borderColor: "white" }}
              onClick={handleGitHubClick}
              aria-label="GitHub"
              onMouseDown={(e) => e.preventDefault()} // Prevents focus retention
            >
              <FaGithub />
            </IconButton>

            {/* LinkedIn Button */}
            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.800", borderColor: "white" }}
              variant="ghost"
              onClick={handleLinkedInClick}
              aria-label="LinkedIn"
              onMouseDown={(e) => e.preventDefault()} // Prevents focus retention
            >
              <FaLinkedin />
            </IconButton>

            {/* Resume Download Button */}
            <IconButton
              bg="black"
              color="white"
              _hover={{ bg: "gray.800", borderColor: "white" }}
              onClick={handleResumeDownload}
              px="4"
              variant="outline"
              borderStyle="solid"
              borderColor="white"
              aria-label="Download Resume"
              onMouseDown={(e) => e.preventDefault()} // Prevents focus retention
            >
              Resume
              <MdDownload />
            </IconButton>
          </HStack>
        </Flex>
      </Box>
      {children}
    </>
  );
};

export default Navbar;
