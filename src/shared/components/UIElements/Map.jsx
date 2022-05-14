import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const { center } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: 16
      })
    });
  }, [center]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    />
  );
};

export default Map;