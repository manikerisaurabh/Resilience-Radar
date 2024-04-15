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
      setTempLoc(lonLat);

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
    <div className="flex flex-col items-center gap-3">
      <div className="map mt-28 z-50 h-[68vh] w-[68vw] " ref={mapRef}></div>
      <label> Marked Location : {TempLoc[0] + " " + TempLoc[1]}</label>
      <label> Confirmed Location : {loc[0] + " " + loc[1]}</label>
      <button
        className="btn btn-primary bg-slate-900 w-fit text-white"
        onClick={handleConfirm}
      >
        Confirm Location
      </button>
    </div>
  );
};

export default MapComponent;
