import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

const MapComponent = ({ setLoc }) => {
    const mapRef = useRef(null);


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
            console.log('Clicked position (lon, lat):', lonLat);
            setLoc(lonLat)

            const marker = new Feature({
                geometry: new Point(clickedCoord),
            });

            marker.setStyle(
                new Style({
                    image: new Icon({
                        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                        scale: 0.5,
                    }),
                })
            );

            vectorSource.clear(); // Clear existing markers
            vectorSource.addFeature(marker); // Add new marker

            // Optional: You can also do further processing with the clicked coordinates
            // Example: reverse geocoding, API calls, etc.
        };

        // Register click event listener on the map
        mapObj.on('click', handleClick);

        return () => {
            mapObj.un('click', handleClick); // Cleanup the click event listener
            mapObj.setTarget(undefined); // Unmount the map
        };
    }, []);

    return (<div>
        <div className="map mt-28 z-50 h-[80vh] w-[80vw]" ref={mapRef}>
        </div>
        <button className='absolute z-50 top-0 right-0 bg-slate-900 text-white'>Confirm</button>
    </div>
    );

};

export default MapComponent;
