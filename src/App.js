import React from 'react';
import { Provider } from 'mobx-react'

import './utils/AsyncInterceptors'
import AppRouter from './AppRouter'
import Stores from './stores/'

function App() {
  return (
  	<Provider {...Stores}>
  		<AppRouter />
  	</Provider>
  );
}

export default App;
