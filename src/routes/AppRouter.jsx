import LoginContainer from "../containers/LoginContainer";
import Home from "../components/pages/Home";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;