import React from 'react'
import {render} from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import App from './app'



import './config'
import reducers from './reducer'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'

const store=createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
render(
   <Provider store={store}>
       <BrowserRouter>
           <App/>
       </BrowserRouter>
   </Provider>
   ,document.getElementById('root')
)
