// import { Box, Image, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { Place } from "./types/Place";
// import { IoLocation } from "react-icons/io5";
// import { BiX } from "react-icons/bi";

// interface Props {
//   coordinates: { lat: number; lng: number };
//   setCoordinates: (coords: { lat: number; lng: number }) => void;
//   setBounds: any;
//   places: Place[];
// }

// interface MarkerProps {
//   lat: number;
//   lng: number;
// }

// const Marker = ({ lat, lng }: MarkerProps) => {
//   if (
//     typeof lat === "undefined" ||
//     typeof lng === "undefined" ||
//     isNaN(lat) ||
//     isNaN(lng)
//   ) {
//     console.error("Invalid lat or lng for marker:", lat, lng);
//     return null;
//   }

//   console.log("Rendering marker at: ", lat, lng);
//   return (
//     <div
//       style={{
//         position: "absolute",
//         width: "30px",
//         height: "30px",
//         border: "1px solid black",
//         transform: "translate(-50%, -50%)",
//         cursor: "pointer",
//       }}
//     >
//       <IoLocation color="red" fontSize={30} />
//     </div>
//   );
// };

// const Map = ({ coordinates, setCoordinates, setBounds, places }: Props) => {
//   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

//   const [isCard, setIsCard] = useState(false);
//   const [cardData, setCardData] = useState<Place | null>(null);
//   const validPlaces = places.filter(
//     (place) => place.name && place.latitude && place.longitude
//   );

//   return (
//     <Box width={"full"} height={"full"} bg={"black"}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: apiKey }}
//         defaultCenter={coordinates}
//         center={coordinates}
//         defaultZoom={10}
//         margin={[50, 50, 50, 50]}
//         options={{}}
//         onChange={(e) => {
//           setCoordinates({ lat: e.center.lat, lng: e.center.lng });
//           setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
//         }}
//         onChildClick={(key) => {
//           const place = places.find((p) => p.name === key);
//           if (place) {
//             setCardData(place);
//             setIsCard(true);
//           }
//         }}
//       >
//         {validPlaces.map((place) => {
//           console.log(
//             "Marker for place:",
//             place.name,
//             "at",
//             place.latitude,
//             place.longitude
//           );

//           if (
//             !isNaN(Number(place.latitude)) &&
//             !isNaN(Number(place.longitude))
//           ) {
//             return (
//               <Marker
//                 key={place.location_id}
//                 lat={Number(place.latitude)}
//                 lng={Number(place.longitude)}
//               />
//             );
//           }
//           return null;
//         })}

//         {isCard && cardData && (
//           <Box
//             width={"200px"}
//             height={"150px"}
//             bg={"whiteAlpha.900"}
//             position={"absolute"}
//             top={-12}
//             left={0}
//             transform={"translate(-50%, -50%)"}
//             shadow={"lg"}
//             rounded={"lg"}
//             zIndex={100}
//           >
//             <Image
//               objectFit={"cover"}
//               width={"full"}
//               height={"120px"}
//               rounded={"lg"}
//               src={
//                 cardData?.photo
//                   ? cardData?.photo?.images?.large?.url
//                   : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
//               }
//             ></Image>

//             <Text
//               textTransform={"capitalize"}
//               width={"40"}
//               fontSize={"lg"}
//               fontWeight={500}
//               isTruncated
//             >
//               {cardData.name}
//             </Text>

//             <Box
//               cursor={"pointer"}
//               position={"absolute"}
//               top={2}
//               right={2}
//               width={"30px"}
//               height={"30px"}
//               bg={"red.300"}
//               rounded={"full"}
//               display={"flex"}
//               justifyContent={"center"}
//               alignItems={"center"}
//               onClick={() => {
//                 setIsCard(false);
//               }}
//             >
//               <BiX fontSize={20} />
//             </Box>
//           </Box>
//         )}
//       </GoogleMapReact>
//     </Box>
//   );
// };

// export default Map;
