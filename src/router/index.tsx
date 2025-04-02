import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../providers/AuthContext.provider";

import AccessControl from "../providers/AccessControl.provider";


const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<AccessControl />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;