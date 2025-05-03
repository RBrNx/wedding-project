import { Colours } from 'library/styles';
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';

const useRefreshControl = ({ offset = 15, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        progressViewOffset={offset}
        onRefresh={async () => {
          setIsRefreshing(true);
          await onRefresh();
          setIsRefreshing(false);
        }}
        progressBackgroundColor={Colours.primary}
        colors={[Colours.neutral.white]}
        tintColor={Colours.primary}
      />
    );
  };

  return {
    renderRefreshControl,
  };
};

export default useRefreshControl;
