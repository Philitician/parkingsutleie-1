import { NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

// Gallery of parking spaces, each parking space is a clickable, styled Card and leads to a page with more information about the parking space
const FindParkingSpacesPage: NextPage = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const { data } =
    api.parkingSpaces.getAllWithDistance.useQuery(currentLocation);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-20">
        <h1 className="my-10 text-2xl">Find parking spaces!</h1>
        <div className="flex flex-col gap-10">
          {data?.map((parkingSpace) => (
            <div key={parkingSpace.id}>
              <h1>{parkingSpace.name}</h1>
              <p>{parkingSpace.address}</p>
              <p>NOK {parkingSpace.price}</p>
              <p>Avstand: {parkingSpace.distance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindParkingSpacesPage;
