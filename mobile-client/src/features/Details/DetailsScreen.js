import { Layout } from 'library/styles';
import React from 'react';
import styled from 'styled-components/native';
import DashboardHeader from 'features/Dashboard/components/DashboardHeader';
import MapView, { Marker } from 'react-native-maps';
import DetailsList from './components/DetailsList';

const DetailsScreen = () => {
  const venueName = 'Bowfield Hotel & Country Club';

  return (
    <Container>
      <StyledDashboardHeader title='Details' />
      <VenueLocation
        provider='google'
        pitchEnabled={false}
        initialRegion={{
          latitude: 55.797401800863895,
          longitude: -4.5689032414826745,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
      >
        <Marker coordinate={{ latitude: 55.797401800863895, longitude: -4.5689032414826745 }} title={venueName} />
      </VenueLocation>
      <DetailsList venueName={venueName} />
    </Container>
  );
};

const Container = styled.View`
  padding-top: ${Layout.statusBarHeight}px;
  flex: 1;
`;

const StyledDashboardHeader = styled(DashboardHeader)`
  padding-horizontal: 5%;
`;

const VenueLocation = styled(MapView)`
  height: 85%;
  width: 100%;
`;

export default DetailsScreen;
