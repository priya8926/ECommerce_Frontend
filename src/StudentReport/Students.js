import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function Students() {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const ref = useRef();

  const columns = [
    { field: "id", headerName: "#", minWidth: 50 },
    { field: "firstName", headerName: "First Name", minWidth: 150, flex: 0.4 },
    { field: "lastName", headerName: "Last Name", minWidth: 150, flex: 0.4 },
    { field: "gender", headerName: "Gender", minWidth: 150, flex: 0.3 },
    {
      field: "birthdate",
      headerName: "Date Of Birth",
      minWidth: 150,
      flex: 0.4,
    },
    { field: "email", headerName: "Email", minWidth: 200, flex: 0.5 },
    {
      field: "enrollmentNo",
      headerName: "Entrollment No",
      minWidth: 100,
      flex: 0.3,
    },
    { field: "termFees", headerName: "Term Fees", minWidth: 150, flex: 0.3 },
    { field: "department", headerName: "Department", minWidth: 200, flex: 0.4 },
    {
      field: "view",
      headerName: "View",
      minWidth: 50,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => ShowData(params.row)}
          ></Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => deleteStudent(params.row.studentID)}
          ></Button>
        );
      },
    },
  ];
  const rows = [];

  allStudents &&
    allStudents.forEach((item, index) => {
      rows.push({
        id: index + 1,
        studentID: item.studentID,
        firstName: item.firstName,
        lastName: item.lastName,
        gender: item.gender,
        birthdate: item.dateOfBirth,
        email: item.email,
        enrollmentNo: item.enrollmentNo,
        termFees: item.fees,
        department: item.departmentName,
        address: item.address,
        city: item.city,
        state: item.state,
        zipCode: item.zipCode,
        phoneNumber: item.phoneNumber,
      });
    });
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(
          `https://localhost:7283/api/Department/all`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.log("Error fetching departments:", error);
      }
    };

    fetchDepartment();
    getAllStd();
  }, []);

  const getAllStd = async () => {
    try {
      const response = await fetch(`https://localhost:7283/api/Student/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAllStudents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStdByDepartment = async (departmentId) => {
    try {
      const response = await fetch(
        `https://localhost:7283/api/Student/${departmentId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAllStudents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedDept === "") {
      getAllStd();
    } else {
      getStdByDepartment(selectedDept);
    }
  }, [selectedDept]);

  const handleDepartmentChange = (e) => {
    const selectDepartment = e.target.value;
    setSelectedDept(selectDepartment);
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirmDelete) return;
    else {
      alert("student report deleted!!!");
    }
    const response = await fetch(`https://localhost:7283/api/Student/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getAllStd();
    }
  };

  const ShowData = async (item) => {
    setSelectedStudent(item);
    console.log(item, "hiiii");
    ref.current.click();
  };
  useEffect(() => {
    getAllStd();
  }, []);
  return (
    <>
      <>
        {/* Button trigger modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Student Report
                </h5>
              </div>
              <div>
                {selectedStudent && (
                  <div className="modal-body">
                    <p>
                      <strong>First Name :</strong> {selectedStudent.firstName}
                    </p>
                    <p>
                      <strong>Last Name :</strong> {selectedStudent.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Enrollment Number:</strong>{" "}
                      {selectedStudent.enrollmentNo}
                    </p>
                    <p>
                      <strong>Term Fees:</strong> {selectedStudent.termFees}
                    </p>
                    <p>
                      <strong>BirthDate:</strong>
                      {selectedStudent.birthdate}
                    </p>
                    <p>
                      <strong>Contact:</strong> {selectedStudent.phoneNumber}
                    </p>
                    <p>
                      <strong>Gender :</strong> {selectedStudent.gender}
                    </p>
                    <p>
                      <strong>address:</strong> {selectedStudent.address}
                    </p>
                    <p>
                      <strong>City:</strong> {selectedStudent.city}
                    </p>
                    <p>
                      <strong>State:</strong> {selectedStudent.state}
                    </p>
                    <p>
                      <strong>Zipcode:</strong> {selectedStudent.zipCode}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="px-5 mt-5 container ">
        <span>
          <strong>Choose Student By Department : </strong>
        </span>
        <select
          onChange={handleDepartmentChange}
          value={selectedDept}
          name="selectedDept"
        >
          <option value="">Select Department</option>
          {Array.isArray(departments) &&
            departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.departmentName}
              </option>
            ))}
        </select>
      </div>
      {allStudents.length > 0 ? (
        // <table className="table mt-3 container  table-danger table-striped">
        //   <thead>
        //     <tr className="text-center">
        //       <th scope="col">#</th>
        //       <th scope="col">First Name</th>
        //       <th scope="col">Last Name</th>
        //       <th scope="col">Gender</th>
        //       <th scope="col">Email</th>
        //       <th scope="col">Birth Date</th>
        //       <th scope="col">Enrollment No</th>
        //       <th scope="col">Term Fees</th>
        //       <th scope="col">Deparment</th>
        //       <th scope="col">Show</th>
        //       <th scope="col">Delete</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {allStudents.map((i, index) => {
        //       return (
        //         <>
        //           <tr key={index} className="text-center">
        //             <td>{index + 1}</td>
        //             <td>{i.firstName}</td>
        //             <td>{i.lastName}</td>
        //             <td>{i.gender}</td>
        //             <td>{i.email}</td>
        //             <td>{i.dateOfBirth}</td>
        //             <td >{i.enrollmentNo}</td>
        //             <td >{i.fees}</td>
        //             <td>{i.departmentName}</td>
        //             <td>
        //               <i
        //                 className="fa-solid fa-eye"
        //                 style={{ color: "#3e4aea" }}
        //                 onClick={() => ShowData(i)}
        //               />
        //             </td>
        //             <td>
        //               <i
        //                 className="fa-solid fa-trash"
        //                 style={{ color: "#db3d45" }}
        //                 onClick={() => deleteStudent(i.studentID)}
        //               />
        //             </td>
        //           </tr>
        //         </>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={paginationModel.pageSize}
            onPageSizeChange = {(newPageSize) => setPaginationModel({...paginationModel , pageSize : newPageSize })}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            pageSizeOptions={[5,10,20,50]}
            disableRowSelectionOnClick
            autoHeight
            className="table-danger m-5"
          />
        </div>
      ) : (
        <div className="container m-5">
          <h4>No Record Found!!</h4>
        </div>
      )}
    </>
  );
}

export default Students;
