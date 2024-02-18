import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/homepage";
import EmployeeList from "./components/EmployeeList/employeeList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
};

export default App;
