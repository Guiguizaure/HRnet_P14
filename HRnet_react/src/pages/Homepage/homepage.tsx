import React from "react";
import { Link } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/employeeForm";
import "./homepage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage container-sm">
      <h1>HRnet</h1>
      <Link to="/employees">View Current Employees</Link>
      <EmployeeForm />
    </div>
  );
};

export default HomePage;
