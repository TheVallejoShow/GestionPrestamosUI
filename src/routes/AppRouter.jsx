import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "../containers/LoginContainer";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;