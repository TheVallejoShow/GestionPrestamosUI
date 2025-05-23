import LoginContainer from './containers/LoginContainer';
import PrivateRoute from './routes/PrivateRoute';
import Home from './components/pages/Home';

import './App.css';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
