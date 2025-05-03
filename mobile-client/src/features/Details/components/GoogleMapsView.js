import { Outlines } from 'library/styles';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components';

const GoogleMapsView = ({ latitude, longitude, title }) => {
  return (
    <MapContainer>
      <VenueMap
        provider={PROVIDER_GOOGLE}
        pitchEnabled={false}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={title} />
      </VenueMap>
    </MapContainer>
  );
};

const MapContainer = styled.View`
  ${Outlines.borderRadius};
  overflow: hidden;
`;

const VenueMap = styled(MapView)`
  height: 200px;
  width: 100%;
  ${Outlines.borderRadius};
  overflow: hidden;
`;

export default GoogleMapsView;
