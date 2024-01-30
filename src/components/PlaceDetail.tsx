import { Flex, Text, Image, Badge } from "@chakra-ui/react";
import Rating from "./types/Rating";
import { IoLocation } from "react-icons/io5";
import { Place } from "./types/Place";

interface Props {
  place: Place;
}

const PlaceDetail = ({ place }: Props) => {
  return (
    <Flex
      bg={"whiteAlpha.900"}
      px={4}
      py={2}
      mb={2}
      shadow={"lg"}
      direction={"column"}
      alignItems={"start"}
      justifyContent={"space-between"}
    >
      <Flex justifyContent={"space-between"} width={"full"}>
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          width={"full"}
          px={2}
        >
          <Flex
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <Text
              textTransform={"capitalize"}
              width={"40"}
              fontSize={"lg"}
              fontWeight={500}
              isTruncated
            >
              {place.name}
            </Text>
            <Text fontSize={"sm"} fontWeight={"500"} color={"gray.500"}>
              {place.price}
            </Text>
          </Flex>
          {/* ratings */}
          <Flex alignContent={"center"} width={"full"}>
            <Rating initialRating={Number(place.rating)}></Rating>
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
              ml={"auto"}
            >{`(${place.num_reviews})`}</Text>
            <Text
              fontSize={"sm"}
              fontWeight={"500"}
              color={"gray.500"}
              ml={"auto"}
            >
              {place.price_level}
            </Text>
          </Flex>
          {/* ranking */}
          <Text
            fontSize={"sm"}
            fontWeight={"500"}
            color={"gray.400"}
            ml={"auto"}
          >
            {place.ranking}
          </Text>
          {/* status */}
          <Text
            fontSize={"sm"}
            fontWeight={"500"}
            color={"gray.600"}
            ml={"auto"}
          >
            {place.open_now_text}
          </Text>
          {/* dietary_restrictions */}
          {place?.dietary_restrictions && (
            <Flex width={"full"} wrap={"wrap"}>
              {place.dietary_restrictions.map((restriction, i) => (
                <Badge
                  colorScheme={"teal"}
                  cursor={"pointer"}
                  key={i}
                  m={1}
                  fontSize={10}
                >
                  {restriction.name}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>

        <Image
          objectFit={"cover"}
          width={"120px"}
          height={"120px"}
          rounded={"lg"}
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
          }
        ></Image>
      </Flex>
      {place?.address && (
        <Flex alignItems={"center"} width={"full"} px={1} my={2}>
          <IoLocation fontSize={20} color="gray" />
          <Text
            isTruncated
            fontSize={"small"}
            fontWeight={"500"}
            color={"gray.700"}
            ml={1}
          >
            {place.address}
          </Text>
        </Flex>
      )}
      {/* websites */}
      <Flex
        alignItems={"center"}
        width={"full"}
        px={1}
        my={2}
        justifyContent="space-between"
      >
        {place.website && (
          <Text
            as="a"
            href={place.website}
            fontSize={"small"}
            fontWeight={"500"}
            color={"blue.500"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </Text>
        )}

        {place.web_url && (
          <Text
            as="a"
            href={place.web_url}
            fontSize={"small"}
            fontWeight={"500"}
            color={"blue.500"}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on TripAdvisor
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default PlaceDetail;
