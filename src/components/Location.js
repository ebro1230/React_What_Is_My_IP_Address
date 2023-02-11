import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

const ResizeMap = ({ height }) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [height]);
};

export default function Location(props) {
  return (
    <>
      {props.position ? (
        <div className="mapDiv" style={{ height: props.height - 100 }}>
          <MapContainer
            center={props.position}
            zoom={12}
            scrollWheelZoom={false}
            className="mapContainer"
            style={{ height: 100 + "%" }}
          >
            <RecenterAutomatically
              lat={props.position[0]}
              lng={props.position[1]}
            />
            <ResizeMap height={props.height} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={props.position}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                {props.IPAddress.location.city},{" "}
                {props.IPAddress.location.region},{" "}
                {props.IPAddress.location.country} <br /> Timezone:{" "}
                {props.IPAddress.location.timezone} UTC
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : null}
    </>
  );
}
