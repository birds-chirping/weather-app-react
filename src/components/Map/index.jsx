import React, { useEffect, useState } from "react";
import { GeocodingAPI } from "../../api/geocoding";
import "./style.css";

const Mappy = ({ location }) => {
  const [boundings, setBoundings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const geocodingData = await GeocodingAPI.getCoordinates(location);
      const coords =
        geocodingData.length > 0
          ? {
              data: true,
              boundingbox: geocodingData[0].boundingbox,
              lat: geocodingData[0].lat,
              lon: geocodingData[0].lon,
            }
          : { data: false };

      setBoundings(coords);
      setLoading(false);
    };
    fetchData();

    return () => {
      setLoading(true);
    };
  }, [location]);

  return loading == true ? (
    <div>Loading...</div>
  ) : boundings.data ? (
    <div className="map-container">
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=
        ${Number(boundings.boundingbox[2])}%2C${Number(boundings.boundingbox[0])}%2C${Number(
          boundings.boundingbox[3]
        )}%2C${Number(boundings.boundingbox[1])}
        &marker=${Number(boundings.lat)}%2C${Number(boundings.lon)}&amp;layer=mapnik`}
      ></iframe>
    </div>
  ) : (
    <div>Error: no map found</div>
  );
};

export default Mappy;
