import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './routes/route'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
