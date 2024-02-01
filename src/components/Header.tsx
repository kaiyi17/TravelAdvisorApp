import {
  Flex,
  InputGroup,
  InputRightElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import Rating from "./types/Rating";
import {
  BiChevronDown,
  BiHotel,
  BiMapAlt,
  BiRestaurant,
  BiSearch,
  BiStar,
} from "react-icons/bi";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

interface Props {
  isLoaded: boolean;
  setType: (type: string) => void;
  setRatings: (rating: number) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}
const Header = ({ isLoaded, setType, setRatings, setCoordinates }: Props) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoordinates({ lat, lng });
      }
    }
  };

  return (
    <Flex
      position={"absolute"}
      top={0}
      left={0}
      width={"full"}
      px={4}
      py={2}
      zIndex={101}
    >
      {isLoaded ? (
        <Flex>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <InputGroup width={"35vw"} shadow={"lg"}>
              <InputRightElement
                pointerEvents={"none"}
                children={<BiSearch color="gray" fontSize={20}></BiSearch>}
              />
              <Input
                type="text"
                placeholder="Search Google Map..."
                variant={"filed"}
                fontSize={18}
                bg={"white"}
                color={"gray.700"}
                _hover={{ bg: "whiteAlpha.800" }}
                _focus={{ bg: "whiteAlpha.800" }}
                _placeholder={{ color: "gray.700" }}
              />
            </InputGroup>
          </Autocomplete>

          <Flex alignItems={"center"} justifyContent={"center"}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              px={4}
              py={2}
              bg={"white"}
              rounded={"full"}
              ml={4}
              shadow={"lg"}
              cursor={"pointer"}
              _hover={{ bg: "gray.100" }}
              transition={"ease-in-out"}
              transitionDuration={"0.3s"}
            >
              <Menu>
                <BiStar fontSize={25} />
                <MenuButton mx={2} transition="all 0.2s" borderRadius={"md"}>
                  Choose ratings
                </MenuButton>
                <MenuList>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onClick={() => setRatings(0)}
                  >
                    <Text fontSize={20} fontWeight={500} color={"gray.700"}>
                      All Ratings
                    </Text>
                  </MenuItem>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    onClick={() => setRatings(2)}
                  >
                    <Text fontSize={20} fontWeight={500} color={"gray.700"}>
                      2.0
                    </Text>
                    <Rating initialRating={2} />
                  </MenuItem>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    onClick={() => setRatings(3)}
                  >
                    <Text fontSize={20} fontWeight={500} color={"gray.700"}>
                      3.0
                    </Text>
                    <Rating initialRating={3} />
                  </MenuItem>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    onClick={() => setRatings(4)}
                  >
                    <Text fontSize={20} fontWeight={500} color={"gray.700"}>
                      4.0
                    </Text>
                    <Rating initialRating={4} />
                  </MenuItem>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    onClick={() => setRatings(4.5)}
                  >
                    <Text fontSize={20} fontWeight={500} color={"gray.700"}>
                      4.5
                    </Text>
                    <Rating initialRating={5} />
                  </MenuItem>
                </MenuList>
              </Menu>
              <BiChevronDown fontSize={25} />
            </Flex>
            {/* Restaurants */}
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              px={4}
              py={2}
              bg={"white"}
              rounded={"full"}
              ml={4}
              shadow={"lg"}
              cursor={"pointer"}
              _hover={{ bg: "gray.100" }}
              transition={"ease-in-out"}
              transitionDuration={"0.3s"}
              onClick={() => setType("restaurants")}
            >
              <BiRestaurant fontSize={25} />
              <Text ml={3} fontSize={16} fontWeight={500}>
                Restaurants
              </Text>
            </Flex>
            {/* Hotels */}
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              px={4}
              py={2}
              bg={"white"}
              rounded={"full"}
              ml={4}
              shadow={"lg"}
              cursor={"pointer"}
              _hover={{ bg: "gray.100" }}
              transition={"ease-in-out"}
              transitionDuration={"0.3s"}
              onClick={() => setType("hotels")}
            >
              <BiHotel fontSize={25} />
              <Text ml={3} fontSize={16} fontWeight={500}>
                Hotels
              </Text>
            </Flex>
            {/* Attractions */}
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              px={4}
              py={2}
              bg={"white"}
              rounded={"full"}
              ml={4}
              shadow={"lg"}
              cursor={"pointer"}
              _hover={{ bg: "gray.100" }}
              transition={"ease-in-out"}
              transitionDuration={"0.3s"}
              onClick={() => setType("attractions")}
            >
              <BiMapAlt fontSize={25} />
              <Text ml={3} fontSize={16} fontWeight={500}>
                Attractions
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <div>Fail to load....</div>
      )}
    </Flex>
  );
};

export default Header;
