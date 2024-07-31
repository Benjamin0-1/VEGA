import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './redux/store/store.js'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js'; // Importa tu configuración de i18next
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
  <Provider store={ store }>
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Provider> 
  
  </I18nextProvider>
)
