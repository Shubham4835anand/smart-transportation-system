import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = [37.7749, -122.4194]; // Default location (San Francisco)

const LiveMap = () => {
  const [location, setLocation] = useState(defaultCenter);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error('Error getting location:', error)
    );
  }, []);

  return (
    <div>
      <h2 className='text-2xl font-bold'>Live Map (OpenStreetMap)</h2>
      <MapContainer center={location} zoom={14} style={mapContainerStyle}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;
