import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToHash from './components/common/ScrollToHash';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
