import { Box, Icon, HStack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface Props {
  totalStars?: number;
  initialRating: number;
  label?: string;
}

const Rating = ({ totalStars = 5, initialRating = 0, label }: Props) => {
  return (
    <HStack align="center">
      {label && <Text mr={2}>{label}</Text>}
      <Box>
        {Array.from({ length: totalStars }, (_, index) => (
          <Icon
            as={StarIcon}
            key={index}
            color={index < initialRating ? "yellow.400" : "gray.300"}
            cursor="default"
          />
        ))}
      </Box>
    </HStack>
  );
};

export default Rating;
