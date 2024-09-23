import React from 'react'
import './style.css'
import store from './store/store'
import { Provider } from 'react-redux'

import { Home } from './pages/home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CombinedProviders } from './context/combined-providers'

function App() {
    return (
        <CombinedProviders>
            <Provider store={store}>
                <div className="App bg-theme text-color">
                    <Home />
                </div>
            </Provider>
        </CombinedProviders>
    )
}

export default App
