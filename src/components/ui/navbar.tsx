"use client";

import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
        </Flex>
      </Box>
      {children}
    </>
  );
};

export default Navbar;
