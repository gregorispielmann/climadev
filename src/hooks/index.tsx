import React from 'react';

import {DataProvider} from './UserData';
import {LoadingProvider} from './Loading';

const AppProvider: React.FC = ({children}) => (
  <LoadingProvider>
    <DataProvider>{children}</DataProvider>
  </LoadingProvider>
);

export default AppProvider;
