import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Faculty() {
  const navigate = useNavigate()
  const [clgs, setClgs] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedClg, setSelectedClg] = useState(null);
  const [selectedDept, setSelectedDept] = useState([]);
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    class: "",
    collegeId: 0,
    facultyDepartment: [],
  });

  const getAllClgsByDept = async () => {
    const response = await fetch(`https://localhost:7283/api/College/all`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("hmmm", data);
      setClgs(data);
    }
  };

  const handleCollegeChange = (e) => {
    const collegeId = parseInt(e.target.value);
    const selectedCollege = clgs.find((c) => c.id === collegeId);
    setSelectedClg(selectedCollege);
    setDepartment(selectedCollege ? selectedCollege.departmentName : []);
    setSelectedDept([]);
    setFaculty((prev) => ({
      ...prev,
      collegeId: collegeId,
      facultyDepartment: [],
    }));
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    const departmentId = parseInt(value);
    let updatedselectedDept = selectedDept;

    if (checked) {
      updatedselectedDept = [...selectedDept , departmentId]
    } else {
      updatedselectedDept = selectedDept.filter(
        (dept) => dept !== departmentId
      );
    }
    setSelectedDept(updatedselectedDept);
    setFaculty((prev) => ({
      ...prev,
      facultyDepartment: updatedselectedDept,
    }));
  };

  const facultySubmitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...faculty,
      facultyDepartment: selectedDept,
    };
    const response = await fetch(`https://localhost:7283/api/College/faculty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data, "faculty");
      alert("faculty created");
      navigate("/college/faculty/all")
    }
  };
  const handleInputChange = (e) => {
    setFaculty((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    getAllClgsByDept();
  }, []);
  return (
    <>
      <div className="container mt-5 ">
        <h4 className="text-center">Create Faculty</h4>
        <form className=" align-items-center" onSubmit={facultySubmitHandler}>
          <div className="mb-3 w-50">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={faculty.name}
              onChange={handleInputChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 w-50">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={faculty.email}
              onChange={handleInputChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 w-50 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Choose College :
            </label>
            <select
              className="w-50 text-center mx-3"
              onChange={handleCollegeChange}
              value={selectedClg ? selectedClg.id : ""}
              name="collegeId"
            >
              <option value="">select college</option>
              {Array.isArray(clgs) &&
                clgs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.collegeName}
                  </option>
                ))}
            </select>
          </div>
          {selectedClg && (
            <div className="mb-3 w-50">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Select Department :
              </label>
              {Array.isArray(department) &&
                department.map((dept) => (
                  <div key={dept.departmentId}>
                    <input
                      type="checkbox"
                      name="departmentId"
                      value={dept.departmentId}
                      onChange={handleDepartmentChange}
                    />
                    {dept.departmentName}
                  </div>
                ))}
            </div>
          )}
          <div className="mb-3 w-50">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Class
            </label>
            <input
              type="text"
              name="class"
              value={faculty.class}
              onChange={handleInputChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Faculty;
