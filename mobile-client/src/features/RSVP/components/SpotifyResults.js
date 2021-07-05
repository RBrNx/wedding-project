import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from 'library/components/Spacer';
import StandardPressable from 'library/components/StandardPressable';
import { Colours, Outlines, Theme, Typography } from 'library/styles';
import { darken, lighten } from 'library/utils/colours';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import theme from 'styled-theming';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { height } = Dimensions.get('window');
const MAX_HEIGHT = height * 0.65;

const TrackDetail = ({ detail, icon }) => {
  return (
    <DetailContainer>
      <FontAwesome5 name={icon} size={10} color={Colours.neutral.grey2} />
      <Spacer size={5} />
      <Detail>{detail}</Detail>
    </DetailContainer>
  );
};

const SpotifyResults = ({ tracks = [], setSelectedSong, selectedSong }) => {
  const cardExpansion = useSharedValue(0);

  useEffect(() => {
    if (tracks.length) cardExpansion.value = withDelay(MAX_HEIGHT, withTiming(1, { duration: 500 }));
    else cardExpansion.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
  }, [tracks.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: interpolate(cardExpansion.value, [0, 1], [0, MAX_HEIGHT], Extrapolate.CLAMP),
  }));

  return (
    <Card>
      <BottomSheetScrollView style={animatedStyle} nestedScrollEnabled keyboardShouldPersistTaps='handled'>
        {tracks.map((track, index) => {
          const { id, name, album, albumArt, artists } = track;
          const artistList = artists.join(', ');
          const isLast = index === tracks.length - 1;
          const isSelected = id === selectedSong?.id;

          return (
            <React.Fragment key={id}>
              <TrackContainer isSelected={isSelected} isLast={isLast} onPress={() => setSelectedSong(track)}>
                <AlbumArt source={{ uri: albumArt }} />
                <Spacer size={10} />
                <InfoContainer>
                  <TrackName>{name}</TrackName>
                  <Spacer size={5} />
                  <TrackDetail icon='compact-disc' detail={album} />
                  <Spacer size={5} />
                  <TrackDetail icon='user-friends' detail={artistList} />
                </InfoContainer>
                <StyledCircleIcon isSelected={isSelected} size={20} />
              </TrackContainer>
              {(!isLast || index < 5) && <Separator />}
            </React.Fragment>
          );
        })}
      </BottomSheetScrollView>
    </Card>
  );
};

const Card = styled.View`
  width: 100%;
  background-color: ${Theme.card};
  ${Outlines.borderRadius};
  ${Outlines.boxShadow};
  overflow: hidden;
  top: 15px;
`;

const TrackContainer = styled(StandardPressable).attrs(props => ({
  pressedStyle: {
    backgroundColor: Theme.cardPressed(props),
  },
}))`
  flex-direction: row;
  align-items: center;
  padding: 5%;
  background-color: ${props =>
    props.isSelected
      ? theme('theme', {
          light: lighten(Colours.secondary, 0.9),
          dark: darken(Colours.secondary, 0.9),
        })
      : Theme.card};
`;

const AlbumArt = styled.Image`
  width: 64px;
  height: 64px;
  ${Outlines.borderRadius};
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const TrackName = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  ${Typography.body};
  color: ${Theme.headerTextColour};
  width: 95%;
`;

const DetailContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Detail = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  ${Typography.small};
  font-size: 12px;
  color: ${Theme.detailTextColour};
  width: 90%;
`;

const StyledCircleIcon = styled(FontAwesome5).attrs(props => ({
  name: props.isSelected ? 'dot-circle' : 'circle',
  color: props.isSelected ? Colours.secondary : Theme.detailTextColour(props),
}))``;

const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${Theme.detailTextColour};
  width: 90%;
  margin-left: 5%;
`;

export default SpotifyResults;
