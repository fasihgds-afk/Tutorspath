import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToHash from './components/common/ScrollToHash';
import { AppConfigProvider } from './context/AppConfigContext';

function App() {
  return (
    <BrowserRouter>
      <AppConfigProvider>
        <ScrollToHash />
        <AppRoutes />
      </AppConfigProvider>
    </BrowserRouter>
  );
}

export default App;
