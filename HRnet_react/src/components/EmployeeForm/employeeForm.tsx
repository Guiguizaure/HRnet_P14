import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../../data/statesData";
import Modal from "../Modal/modal";
import "./employeeform.css";

// Define a type for the form state
interface EmployeeFormState {
  firstName: string;
  lastName: string;
  dateOfBirth: Date; // Using Date object for react-datepicker
  startDate: Date; // Using Date object for react-datepicker
  street: string;
  city: string;
  state: string; // Will store the abbreviation
  zipCode: string;
  department: string;
}

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeFormState>({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "Sales", // Assuming 'Sales' as default
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle input change for text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Special handling for date pickers
  const handleDateChange = (
    name: keyof EmployeeFormState,
    date: Date | [Date, Date] | null
  ) => {
    if (date) {
      setFormData({
        ...formData,
        [name]: date as Date,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    const newEmployee = {
      ...formData,
      dateOfBirth: formData.dateOfBirth.toISOString(),
      startDate: formData.startDate.toISOString(),
    };
    localStorage.setItem(
      "employees",
      JSON.stringify([...existingEmployees, newEmployee])
    );
    setIsModalOpen(true);
    // Reset form or show confirmation here
  };

  return (
    <div className="container-sm">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <ReactDatePicker
            id="dateOfBirth"
            selected={formData.dateOfBirth}
            onChange={(date: Date) => handleDateChange("dateOfBirth", date)}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={80} // Adjust as needed
            showMonthDropdown
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="startDate">Start Date:</label>
          <ReactDatePicker
            id="startDate"
            selected={formData.startDate}
            onChange={(date: Date) => handleDateChange("startDate", date)}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={80} // Adjust as needed
            showMonthDropdown
          />
        </div>

        <fieldset className="address">
          <legend>Address</legend>

          <div className="input-wrapper">
            <label htmlFor="street">Street:</label>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="city">City:</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className="input-wrapper">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
        </div>

        <button type="submit">Save</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Employee Created!</h2>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
