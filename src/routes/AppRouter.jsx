import LoginContainer from "../containers/LoginContainer"
import Home from "../components/pages/Home";

import PrivateRoute from "../routes/PrivateRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;