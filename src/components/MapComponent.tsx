import { Fragment, useState, useRef, useCallback } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { Place } from "./types/Place";
import { Box, Text, Image } from "@chakra-ui/react";
import _ from "lodash";
import { Bounds } from "./types/Bounds";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Props {
  coordinates: Coordinates;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  bounds: Bounds | null;
  setBounds: (bounds: Bounds) => void;
  places: Place[];
  isLoaded: boolean;
  loadError: Error | null;
}

const MapComponent = ({
  coordinates,
  setCoordinates,
  bounds,
  setBounds,
  places,
  isLoaded,
  loadError,
}: Props) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map>();

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onMapIdle = useCallback(() => {
    if (!mapRef.current) return;
    const currentMap = mapRef.current;
    const newBounds = currentMap.getBounds();
    const newCenter = currentMap.getCenter();
    if (newBounds && newCenter) {
      const newCoordinates = { lat: newCenter.lat(), lng: newCenter.lng() };
      const newNe = newBounds.getNorthEast().toJSON();
      const newSw = newBounds.getSouthWest().toJSON();
      if (
        newCoordinates.lat !== coordinates.lat ||
        newCoordinates.lng !== coordinates.lng
      ) {
        setCoordinates(newCoordinates);
      }
      if (
        !bounds ||
        newNe.lat !== bounds.ne.lat ||
        newSw.lat !== bounds.sw.lat
      ) {
        setBounds({
          ne: newNe,
          sw: newSw,
        });
      }
    }
  }, [coordinates, bounds, setCoordinates, setBounds]);

  if (loadError) {
    return <div>Fail to load the map....</div>;
  }

  return (
    <Fragment>
      <Box style={{ height: "100vh", width: "100%" }}>
        {isLoaded ? (
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onIdle={onMapIdle}
            center={coordinates}
            zoom={10}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "100vh" }}
          >
            {places.map((place, index) => {
              console.log(
                "Marker for place:",
                place.name,
                "at",
                place.latitude,
                place.longitude
              );
              if (
                !isNaN(Number(place.latitude)) &&
                !isNaN(Number(place.longitude))
              ) {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: Number(place.latitude),
                      lng: Number(place.longitude),
                    }}
                    onClick={() => handleActiveMarker(index)}
                  >
                    {activeMarker === index ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <Box
                          width={"200px"}
                          height={"150px"}
                          bg={"whiteAlpha.900"}
                          shadow={"lg"}
                          rounded={"lg"}
                        >
                          <Image
                            objectFit={"cover"}
                            width={"full"}
                            height={"120px"}
                            rounded={"lg"}
                            src={
                              place.photo
                                ? place.photo.images.large.url
                                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
                            }
                          />
                          <Text
                            textTransform={"capitalize"}
                            padding={2}
                            width={"40"}
                            fontSize={"lg"}
                            fontWeight={500}
                            isTruncated
                          >
                            {place.name}
                          </Text>
                        </Box>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                );
              }
            })}
          </GoogleMap>
        ) : null}
      </Box>
    </Fragment>
  );
};

export default MapComponent;
