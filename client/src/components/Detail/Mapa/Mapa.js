import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import './index.css';

 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbC1jb250ZWdyYW5kIiwiYSI6ImNsM2s5ZDk3ODA2bHIzamxrcHkwenpoOGwifQ.1722tTpO4XZC5db0YfwDdA';
export const Mapa = () => {
  
  const mapContainer = useRef(null)
  

  const [lng, setLng] = useState(-75.697)
  const [lat, setLat] = useState(4.8093)
  
  const [zoom, setZoom] = useState(15)
  
  
  const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-75.697, 4.8093]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
     }
    ]
  };

    useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/gabriel-contegrand/cl4752zn0000q14nxj8yn284r',
      center: [lng, lat],
      zoom: zoom,
    });

    // Create default markers
    geojson.features.map((feature) =>
      new mapboxgl.Marker({color: 'cyan'}).setLngLat(feature.geometry.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);
  

    return (
    <div>
    <div className="sidebar">
      Ciudad: Buenos Aires | Trabajador: Jose
    </div>
    <div ref={mapContainer} className="map-container" />
    </div>
    );
}