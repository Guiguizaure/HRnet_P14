import React, { useMemo, useEffect, useState } from "react";
import { useTable, usePagination, useGlobalFilter, Column } from "react-table";
import { useNavigate } from "react-router-dom";
import "./employeeList.css";

interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
  }, []);

  const data = useMemo(() => employees, [employees]);

  const columns: Column<Employee>[] = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" as keyof Employee },
      { Header: "Last Name", accessor: "lastName" as keyof Employee },
      { Header: "Start Date", accessor: "startDate" as keyof Employee },
      { Header: "Department", accessor: "department" as keyof Employee },
      { Header: "Date of Birth", accessor: "dateOfBirth" as keyof Employee },
      { Header: "Street", accessor: "street" as keyof Employee },
      { Header: "City", accessor: "city" as keyof Employee },
      { Header: "State", accessor: "state" as keyof Employee },
      { Header: "Zip Code", accessor: "zipCode" as keyof Employee },
    ],
    []
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const padTo2Digits = (num: number) => num.toString().padStart(2, "0");

    return `${padTo2Digits(date.getMonth() + 1)}/${padTo2Digits(
      date.getDate()
    )}/${date.getFullYear()}`;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const handleNavigateHome = () => {
    navigate("/");
  };

  // Input change handler for the global search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value || undefined); // Set the global filter to the input value
  };

  return (
    <div className="employee_form">
      <h2>Current Employees</h2>
      <div className="employee_form__header">
        <span>
          Show{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>{" "}
          entries
        </span>
        <div>
          <label htmlFor="search">Search: </label>
          <input value={globalFilter || ""} onChange={handleSearch} />
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            const rowClassName = index % 2 === 0 ? "even" : "odd";
            return (
              <tr {...row.getRowProps()} className={rowClassName}>
                {row.cells.map((cell) => {
                  // Check if the cell is a date field and format it
                  const formattedValue =
                    cell.column.id === "dateOfBirth" ||
                    cell.column.id === "startDate"
                      ? formatDate(cell.value)
                      : cell.render("Cell");
                  return <td {...cell.getCellProps()}>{formattedValue}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
      </div>
      <button onClick={handleNavigateHome} style={{ marginTop: "20px" }}>
        Home
      </button>
    </div>
  );
};

export default EmployeeList;
