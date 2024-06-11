import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Department() {
  const [department, setDepartment] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDept, setEditDept] = useState("");
  const [editDeptId, setEditDeptId] = useState("");

  const ref = useRef();

  const getAllDepartment = async () => {
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
        console.log("department", data);
        setDepartment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDept = async () => {
    if (newDept.length <= 0) {
      alert("Department name cannot be empty.");
      return;
    }
    const response = await fetch(`https://localhost:7283/api/Department/New`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ departmentName: newDept }),
    });
    if (response.ok) {
      const data = await response.json();
      setDepartment(() => [...department, data]);
      setNewDept("");
      alert("Department added");
    }
  };
  const updateDept = async () => {
    if (editDept.trim() === "") {
      alert("Department name cannot be empty.");
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7283/api/Department/update/${editDeptId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ departmentName: editDept }),
        }
      );
      if (response.ok) {
        getAllDepartment();
        ref.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateDepartment = (item) => {
    setEditDept(item.departmentName);
    setEditDeptId(item.departmentId);
    ref.current.click();
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://localhost:7283/api/Department/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      getAllDepartment();
    }
  };
const veiwData = async()=>{

}
  useEffect(() => {
    getAllDepartment();
  }, []);

  return (
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
                Update Department
              </h5>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="editDept"
                value={editDept}
                onChange={(e) => setEditDept(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateDept}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-25 mb-3 mt-3 container">
        <h6>
          <label className="form-label mt-3">Add Department : </label>
        </h6>
        <div className="input-group">
          <input
            name="newDept"
            type="text"
            className="form-control"
            placeholder="Enter Department name"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={addDept}>
            Add
          </button>
        </div>
      </div>
      <div>
        {department.length > 0 ? (
          <>
            <table className="table mt-3 container  table-danger table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Total No of students</th>
                  <th scope="col">View</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {department.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.departmentName}</td>
                      <td  className="text-center">{item.studentCount}</td>
                      <Link to={`/studentDetails/${item.departmentId}`}>
                      <td>
                        <i
                          className="fa-solid fa-eye"
                          style={{ color: "#3e4aea" }}
                          onClick={() => veiwData()}
                        />
                      </td>
                      </Link>
                      <td>
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "#3e4aea" }}
                          onClick={() => updateDepartment(item)}
                        />
                      </td>
                      <td>
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "#db3d45" }}
                          onClick={() => handleDelete(item.departmentId)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <h4>No Record Found!!</h4>
        )}
      </div>
    </>
  );
}

export default Department;
