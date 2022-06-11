import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./index.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FicmllbC1jb250ZWdyYW5kIiwiYSI6ImNsM2s5ZDk3ODA2bHIzamxrcHkwenpoOGwifQ.1722tTpO4XZC5db0YfwDdA";
export const Mapa = ({ MyDetail }) => {
  const { longitud, latitud, nombres, ciudad } = MyDetail;

  const mapContainer = useRef(null);

  const [lng, setLng] = useState(longitud);
  const [lat, setLat] = useState(latitud);

  const [zoom, setZoom] = useState(15);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitud, latitud],
        },
        properties: {
          title: "Mapbox",
          description: "Direccion",
        },
      },
    ],
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/gabriel-contegrand/cl4752zn0000q14nxj8yn284r",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create default markers
    geojson.features.map((feature) =>
      new mapboxgl.Marker({ color: "cyan" })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  // eslint-disable-next-line no-lone-blocks

  return (
    <div>
      <div className="sidebar">
        Ciudad: {ciudad} | Trabajador: {nombres}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
