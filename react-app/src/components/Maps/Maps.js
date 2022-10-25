import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '450px',
  height: '400px',
};

const Maps = ({ apiKey, center, business }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  
  console.log(business)

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
            <Marker position={center} title={`${business.name}`}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);