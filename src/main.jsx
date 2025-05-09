import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {reduxStore} from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { myPersist } from './redux/store.js';


createRoot(document.getElementById('root')).render(
	<StrictMode>
  		<Provider store={reduxStore}>
			<PersistGate persistor={myPersist}>
				<App />
			</PersistGate>
		</Provider>
	</StrictMode>,
)
