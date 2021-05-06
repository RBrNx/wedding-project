import StandardTextInput from 'library/components/StandardTextInput';
import { useLazyQuery } from 'library/hooks';
import useDebounceValue from 'library/hooks/useDebounceValue';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import SEARCH_TRACKS from 'library/graphql/queries/searchTracks.graphql';
import { Colours, Typography } from 'library/styles';
import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import SpotifyResults from './SpotifyResults';
import SpotifyLogo from './SpotifyLogo';

const SpotifySearchInput = ({ setSelectedSong, selectedSong }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 1000);
  const [searchTracks, { loading, data }] = useLazyQuery(SEARCH_TRACKS);
  const { items: tracks } = data?.searchTracks || {};

  useEffect(
    () => {
      const performSearch = async () => {
        await searchTracks({ input: { searchTerm } });
      };

      if (debouncedSearchTerm || debouncedSearchTerm === '') {
        performSearch();
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  return (
    <>
      <Container>
        <StandardTextInput
          label='Song Request'
          value={searchTerm}
          onChangeText={value => setSearchTerm(value)}
          flat
          placeholderComponent={(animatedStyle, multiline) => (
            <PlaceholderContainer style={animatedStyle} multiline={multiline}>
              <PlaceholderText>Powered by</PlaceholderText>
              <StyledLogo size={75} />
            </PlaceholderContainer>
          )}
        />
        {loading && <StyledActivityIndicator color={Colours.secondary} />}
      </Container>
      <SpotifyResults tracks={tracks} setSelectedSong={setSelectedSong} selectedSong={selectedSong} />
    </>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  position: absolute;
  right: 15px;
  elevation: 4;
`;

const PlaceholderContainer = styled(Animated.View)`
  position: absolute;
  left: 15px;
  top: 28px;
  margin-top: ${props => (props.multiline ? 5 : 0)}px;
  flex-direction: row;
  align-items: center;
`;

const PlaceholderText = styled(Animated.Text)`
  color: #aaa;
  ${Typography.body};
`;

const StyledLogo = styled(SpotifyLogo).attrs(() => ({
  colour: '#aaa',
}))`
  height: 20px;
  top: 1px;
`;

export default SpotifySearchInput;
