import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import PlaceDetail from "./PlaceDetail";
import { Place } from "./types/Place";

interface Props {
  places: Place[];
  isLoading: any;
}

const List = ({ places, isLoading }: Props) => {
  if (isLoading)
    return (
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height={"100vh"}
        position={"absolute"}
        left={0}
        top={0}
        zIndex={1}
        overflow={"hidden"}
        px={2}
      >
        <Box padding={"6"} boxShadow={"lg"} bg="white" mt={3}>
          <SkeletonCircle size={"10"} />
          <SkeletonText mt="4" noOfLines={4} spacing="4"></SkeletonText>
        </Box>
        <Box padding={"6"} boxShadow={"lg"} bg="white" mt={3}>
          <SkeletonCircle size={"10"} />
          <SkeletonText mt="4" noOfLines={4} spacing="4"></SkeletonText>
        </Box>
        <Box padding={"6"} boxShadow={"lg"} bg="white" mt={3}>
          <SkeletonCircle size={"10"} />
          <SkeletonText mt="4" noOfLines={4} spacing="4"></SkeletonText>
        </Box>
        <Box padding={"6"} boxShadow={"lg"} bg="white" mt={3}>
          <SkeletonCircle size={"10"} />
          <SkeletonText mt="4" noOfLines={4} spacing="4"></SkeletonText>
        </Box>
      </Flex>
    );
  return (
    <Flex
      direction={"column"}
      bg={"whiteAlpha.900"}
      width={"37vw"}
      height={"100vh"}
      position={"absolute"}
      left={0}
      top={0}
      zIndex={1}
      overflow={"hidden"}
      px={2}
    >
      <Flex flex={1} overflowY={"scroll"} mt={16} direction={"column"}>
        {places &&
          places.map((place, i) => <PlaceDetail place={place} key={i} />)}
      </Flex>
    </Flex>
  );
};

export default List;
