import { useEffect, useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import List from "./components/List";
import { getPlacesData } from "./api/data";
import { Bounds } from "./components/types/Bounds";
import { Place } from "./components/types/Place";
import MapComponent from "./components/MapComponent";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [places, setPLaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [coordinates, setCoordinates] = useState({
    lat: 45.5017,
    lng: -73.5673,
  });
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //get the users curent location on initial login/ website is loaded
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ lat: coords.latitude, lng: coords.longitude });
        setIsLocationLoaded(true);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocationLoaded(true);
      }
    );
  }, []);

  useEffect(() => {
    const filteredData = places.filter((place) => place.rating > ratings);
    setFilteredPlaces(filteredData);
  }, [ratings]);

  useEffect(() => {
    if (bounds && coordinates) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setPLaces(data);
          const filteredData = data.filter(
            (place: Place) => place.rating > ratings
          );
          setFilteredPlaces(filteredData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
          setIsLoading(false);
        });
    }
  }, [type, bounds, coordinates, ratings]);

  const safeLoadError = loadError ?? null;

  if (loadError) return <div>Error loading maps</div>;

  return (
    <>
      <ChakraProvider>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          height={"100vh"}
          maxWidth={"100vw"}
          maxHeight={"100vh"}
          position={"relative"}
        >
          <Header
            isLoaded={isLoaded}
            setType={setType}
            setRatings={setRatings}
            setCoordinates={setCoordinates}
          />
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            isLoading={isLoading}
          />

          {isLoaded && isLocationLoaded ? (
            <MapComponent
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              bounds={bounds}
              setBounds={setBounds}
              places={filteredPlaces.length ? filteredPlaces : places}
              isLoaded={isLoaded}
              loadError={safeLoadError}
            />
          ) : (
            <div>Loading map...</div>
          )}
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
