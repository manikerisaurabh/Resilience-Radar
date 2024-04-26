import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MapComponent = ({ loc, setLoc }) => {
  const mapRef = useRef(null);
  let { location } = useParams();
  let [TempLoc, setTempLoc] = useState([74.3501, 16.2229]);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObj = new Map({
      view: new View({
        center: fromLonLat([74.3501, 16.2229]),
        zoom: 16,
      }),
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      target: mapRef.current,
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    mapObj.addLayer(vectorLayer);

    // Function to handle click event on the map
    const handleClick = (event) => {
      const clickedCoord = mapObj.getCoordinateFromPixel(event.pixel);
      const lonLat = toLonLat(clickedCoord);
      console.log("Clicked position (lon, lat):", lonLat);
      let location = [ lonLat[1], lonLat[0] ];
      setTempLoc(location);

      const marker = new Feature({
        geometry: new Point(clickedCoord),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.8,
          }),
        })
      );

      vectorSource.clear(); // Clear existing markers
      vectorSource.addFeature(marker); // Add new marker

      // Optional: You can also do further processing with the clicked coordinates
      // Example: reverse geocoding, API calls, etc.
    };

    // Register click event listener on the map
    mapObj.on("click", handleClick);

    return () => {
      mapObj.un("click", handleClick); // Cleanup the click event listener
      mapObj.setTarget(undefined); // Unmount the map
    };
  }, []);

  const handleConfirm = () => {
    setLoc(TempLoc);
    if (location === "Location") {
      try {
        localStorage.setItem("userLocation", JSON.stringify(TempLoc));
      } catch (error) {
        console.error("Error saving location to local storage:", error);
        // Handle errors appropriately, e.g., display a fallback message
      }
      window.history.back();
    }
  };

  return (
    <div className="flex h-screen justify-center items-center max-md:w-[100vw] p-3 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="map h-[50vh] md:h-[68vh] w-[100vw]" ref={mapRef}></div>
        <div className="p-4">
          <div className="flex flex-col justify-between items-center mb-4">
            <label className="text-gray-700">
              Marked Location: {TempLoc.join(", ")}
            </label>
            <label className="text-gray-700">
              Confirmed Location: {loc.join(", ")}
            </label>
          </div>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-nowrap bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleConfirm}
            >
              Confirm Location
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default MapComponent;
