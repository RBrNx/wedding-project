import React, { createContext, useContext, useEffect, useState } from 'react';
import BOOTSTRAP_QUERY from 'library/graphql/queries/bootstrapQuery.graphql';
import { useQuery } from '@apollo/react-hooks';
import parseError from 'library/utils/parseError';
import { useAuth } from 'context/Authentication';

const DatastoreContext = createContext();

const DatastoreProvider = ({ children }) => {
  const datastore = useProviderDatastore();
  return <DatastoreContext.Provider value={datastore}>{children}</DatastoreContext.Provider>;
};

const useProviderDatastore = () => {
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const { user, bootstrapComplete: authBootstrapped } = useAuth();
  const { data: queryData, loading, error, refetch } = useQuery(BOOTSTRAP_QUERY, {
    skip: !user,
    variables: { filter: { page: 0, limit: 60 } },
  });
  const eventInfo = queryData?.getEventInfo;
  const memoryAlbums = queryData?.getMemoryAlbums;

  if (error) {
    const { message } = parseError(error);
    console.error(message);
  }

  useEffect(() => {
    if (authBootstrapped && !loading && !bootstrapComplete) {
      setBootstrapComplete(true);
    }
  }, [authBootstrapped, bootstrapComplete, loading]);

  return {
    eventInfo,
    memoryAlbums,
    bootstrapComplete,
    refetchData: refetch,
  };
};

const useDatastore = () => {
  const context = useContext(DatastoreContext);
  if (context === undefined) {
    throw new Error('useDatastore must be used within a DatastoreProvider');
  }
  return context;
};

export { DatastoreProvider, useDatastore };
