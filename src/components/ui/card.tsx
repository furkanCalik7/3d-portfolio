import { Box } from "@chakra-ui/react/box";

interface Props {
  children?: React.ReactNode;
}

const InfoCard = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Box
        height="100vh"
        width="100%"
        bgGradient="linear(to-r, #0F2027, #203A43, #2C5364)" // Dark gradient background
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={6}
      >
        {children}
      </Box>
    </>
  );
};

export default InfoCard;
