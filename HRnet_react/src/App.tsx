import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Lazy load the pages
const HomePage = lazy(() => import("./pages/Homepage/homepage"));
const EmployeeList = lazy(() => import("./pages/EmployeeList/employeeList"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
