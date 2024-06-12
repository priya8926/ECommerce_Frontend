import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Department() {
  const [department, setDepartment] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDept, setEditDept] = useState("");
  const [editDeptId, setEditDeptId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        setIsEditing(false)
        setEditDept("")
        setEditDeptId("")
        alert("Department updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateDepartment = (item) => {
    setEditDept(item.departmentName);
    setEditDeptId(item.departmentId);
    setIsEditing(true)
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
            value={isEditing ? editDept : newDept}
            onChange={(e) => isEditing ? setEditDept(e.target.value) : setNewDept(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={isEditing ? updateDept : addDept}>
            {isEditing ? "Update" : "Add"}
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
                      <Link to={`/department/studentDetails/${item.departmentId}`}>
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
