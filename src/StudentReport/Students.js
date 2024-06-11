import React, { useEffect, useRef, useState } from "react";

function Students() {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const ref = useRef()

  
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`https://localhost:7283/api/Department/all`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.log("Error fetching departments:", error);
      }
    };

    fetchDepartment();
  }, []);

  const getAllStd = async () => {
    try {
      const response = await fetch(`https://localhost:7283/api/Student/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
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

  const handleDepartmentChange = (e) => {
    const selectDepartment = e.target.value;
    setDepartments(selectDepartment);

    if (selectDepartment === "") {
      getAllStd();
    } else {
      getStdByDepartment(selectDepartment);
    }
  };

  const deleteStudent = async (id) => {
    const response = await fetch(`https://localhost:7283/api/Student/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("student report deleted!!!");
      getAllStd();
    }
  };

  const ShowData = async (item) => {
    setSelectedStudent(item)
    ref.current.click()
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
                <p><strong>First Name :</strong> {selectedStudent.firstName}</p>
                <p><strong>Last Name :</strong> {selectedStudent.lastName}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Enrollment Number:</strong> {selectedStudent.enrollmentNo}</p>
                <p><strong>BirthDate:</strong> {selectedStudent.dateOfBirth}</p>
                <p><strong>Contact:</strong> {selectedStudent.phoneNumber}</p>
                <p><strong>Gender :</strong> {selectedStudent.gender}</p>
                <p><strong>address:</strong> {selectedStudent.address}</p>
                <p><strong>City:</strong> {selectedStudent.city}</p>
                <p><strong>State:</strong> {selectedStudent.state}</p>
                <p><strong>Zipcode:</strong> {selectedStudent.zipCode}</p>
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
          value={departments}
          name="departments"
        >
          <option value="">Select Department</option>
          {Array.isArray(departments) && departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.departmentName}
                  </option>
                ))}
        </select>
      </div>
      {allStudents.length > 0 ? (
        <table className="table mt-3 container  table-danger table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Enrollment No</th>
              <th scope="col">Show</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((i, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{i.firstName}</td>
                    <td>{i.lastName}</td>
                    <td>{i.gender}</td>
                    <td>{i.email}</td>
                    <td>{i.dateOfBirth}</td>
                    <td>{i.enrollmentNo}</td>
                    <td>
                      <i
                        className="fa-solid fa-eye"
                        style={{ color: "#3e4aea" }}
                        onClick={() => ShowData(i)}
                      />
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#db3d45" }}
                        onClick={() => deleteStudent(i.studentID)}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="container m-5">
          <h4>No Record Found!!</h4>
        </div>
      )}
    </>
  );
}

export default Students;
