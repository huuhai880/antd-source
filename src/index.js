// ** React Imports
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/store'

import reportWebVitals from './reportWebVitals'
// ** Service Worker
import * as serviceWorker from './serviceWorker'
// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('container'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spin />}>
        <LazyApp />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

reportWebVitals()

serviceWorker.unregister()

