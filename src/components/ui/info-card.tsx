import { Box } from "@chakra-ui/react/box";

interface Props {
  children?: React.ReactNode;
}

const InfoCard = (props: Props) => {
  const { children } = props;

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position={"relative"}
      px={6}
      zIndex={2}
    >
      {children}
    </Box>
  );
};

export default InfoCard;
