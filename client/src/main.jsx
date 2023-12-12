import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './app/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
