"use client";

import { Box, Button, Flex, HStack } from "@chakra-ui/react";

interface Props {
  children?: React.ReactNode;
}

const Links = ["Home", "About", "Projects", "Skills", "Contact"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.700",
      }}
    >
      {children}
    </Box>
  );
};

export default function Navbar(props: Props) {
  const { children } = props;
  return (
    <>
      <Box
        bg={"black"}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack gap={8} alignItems={"center"}>
            <HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <Button key={link} bg="black" color="white">
                  {link}
                </Button>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
      {children}
    </>
  );
}
