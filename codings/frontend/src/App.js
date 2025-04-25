// App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./addroutes/Addroutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />x
      </AuthProvider>
    </Router>
  );
};

export default App;
