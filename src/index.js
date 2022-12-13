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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spin />}>
        <LazyApp />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

