import React, { useState, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../../data/statesData";
// import Modal from "../Modal/modal";
// import { Modal } from "vite-react-ts-modal";
import Modal from "npm-react-ts-modal";
import Select from "../Select/select";
import "../Modal/modal.css";
import "./employeeform.css";

// Define a type for the form state
interface EmployeeFormState {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    []
  );

  const handleDateChange = useCallback(
    (name: keyof EmployeeFormState, date: Date | [Date, Date] | null) => {
      if (date) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: date as Date,
        }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [formData]
  );

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  return (
    <div className="container-sm">
      <p>Create Employee</p>
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
            <Select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              options={stateOptions}
            />
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
          <Select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={departmentOptions}
          />
        </div>

        <button type="submit">Save</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h4>Employee Created!</h4>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
