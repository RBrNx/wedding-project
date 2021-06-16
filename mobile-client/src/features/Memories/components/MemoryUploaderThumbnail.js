import StandardPressable from 'library/components/StandardPressable';
import { Colours, Layout } from 'library/styles';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const MemoryUploaderThumbnail = React.memo(
  ({ asset, isSelected, size, selectedAssetIndex, onThumbnailSelect }) => {
    return (
      <Container size={size}>
        <StyledImage source={{ uri: asset.uri }} />
        <SelectorIcon isSelected={isSelected} onPress={() => onThumbnailSelect(asset, isSelected)}>
          {isSelected && <SelectedIndex>{selectedAssetIndex}</SelectedIndex>}
        </SelectorIcon>
      </Container>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.size === nextProps.size &&
      prevProps.selectedAssetIndex === nextProps.selectedAssetIndex &&
      prevProps.asset.id === nextProps.asset.id
    ) {
      return true;
    }
    return false;
  },
);

const Container = styled.View`
  flex: ${1 / 3 - 6 / width / 100};
  margin: 3px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const SelectorIcon = styled(StandardPressable)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: 1.5px solid ${props => (props.isSelected ? Colours.secondary : 'white')};
  background-color: ${props => (props.isSelected ? Colours.secondary : 'transparent')};
  ${Layout.flexCenter}
`;

const SelectedIndex = styled.Text`
  color: ${Colours.neutral.white};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default MemoryUploaderThumbnail;
