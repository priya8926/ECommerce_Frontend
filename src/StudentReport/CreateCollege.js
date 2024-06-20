import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudent.css";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { Button } from "@mui/material";

function CreateCollege() {
  const navigate = useNavigate()
  const [college, setCollege] = useState({
    CollegeName: "",
    ClgDepartment: [],
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
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

    fetchDepartments();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const departmentId = parseInt(value);
    let updatedSelectedDept = selectedDept;

    if (checked) {
      updatedSelectedDept = [...selectedDept, departmentId];
    } else {
      updatedSelectedDept = selectedDept.filter(
        (dept) => dept !== departmentId
      );
    }
    setSelectedDept(updatedSelectedDept);
    setCollege((prev) => ({
      ...prev,
      ClgDepartment: updatedSelectedDept,
    }));
  };

  const handleInputChange = (e) => {
    setCollege((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const collegeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7283/api/College/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(college),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data, "collge");
        alert("College Created");
        navigate("/college/all")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="dashboard">
        <div className="newStudentContainer">
          <form
            action=""
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={collegeSubmitHandler}
          >
            <h2>Create College</h2>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                name="collegeName"
                value={college.collegeName}
                onChange={handleInputChange}
                placeholder="college name"
              />
            </div>
            <div className="department">
              <div>
                {Array.isArray(departments) &&
                  departments.map((d) => (
                    <div key={d.departmentId}>
                      <label>
                        <input
                          type="checkbox"
                          name="departmentId"
                          value={d.departmentId}
                          checked={selectedDept.includes(d.departmentId)}
                          onChange={handleCheckboxChange}
                        />
                        {d.departmentName}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCollege;
