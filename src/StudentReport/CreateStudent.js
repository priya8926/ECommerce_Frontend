import React, { useState , useEffect } from "react";
import "./CreateStudent.css";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AbcIcon from "@mui/icons-material/Abc";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    fees : "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    enrollmentNo: "",
    departmentId : 0
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    const fetchDepartments = async () => {
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

    fetchDepartments();
  }, []);

  const createSudentSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:7283/api/Student/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("student info", data);
        alert("Student report created ")
        navigate("/all")
        
      }
    } catch (error) {
      console.log("error creating student report", error);
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
            onSubmit={createSudentSubmitHandler}
          >
            <h2>Create Student Report</h2>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                name="firstName"
                value={student.firstName}
                onChange={handleInputChange}
                placeholder="Student First Name"
              />
            </div>
            <div>
              <AbcIcon />
              <input
                type="text"
                value={student.lastName}
                name="lastName"
                onChange={handleInputChange}
                placeholder="Student Last Name"
              />
            </div>
            <div>
              <CalendarMonthIcon />
              <input
                type="date"
                value={student.dateOfBirth}
                name="dateOfBirth"
                onChange={handleInputChange}
                placeholder="Your Date of birth"
              />
            </div>
            <div className="gender">
              <WcIcon />
              <div>
                <input
                  type="radio"
                  id="genderMale"
                  name="gender"
                  value="Male"
                  onChange={handleInputChange}
                  checked={student.gender === "Male"}
                />
                <label htmlFor="genderMale">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="genderFemale"
                  name="gender"
                  value="Female"
                  onChange={handleInputChange}
                  checked={student.gender === "Female"}
                />
                <label htmlFor="genderFemale">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="genderOther"
                  name="gender"
                  value="Other"
                  onChange={handleInputChange}
                  checked={student.gender === "Other"}
                />
                <label htmlFor="genderOther">Other</label>
              </div>
            </div>
            <div>
              <EmailIcon />
              <input
                type="email"
                value={student.email}
                name="email"
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <LocalPhoneIcon />
              <input
                type="number"
                value={student.phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                placeholder="Enter your Phone number"
              />
            </div>
            <div>
              <CurrencyRupeeIcon/>
              <input
              type="number"
              value={student.fees}
              name = "fees"
              onChange= {handleInputChange}
              placeholder= "your fees"/>
            </div>
            <div>
              <StorageIcon />
              <input
                type="textarea"
                value={student.address}
                name="address"
                onChange={handleInputChange}
                placeholder="address"
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                value={student.city}
                name="city"
                onChange={handleInputChange}
                placeholder="city"
              />
            </div>
            <div>
              <AddLocationIcon />
              <input
                type="text"
                value={student.state}
                name="state"
                onChange={handleInputChange}
                placeholder="state"
              />
            </div>
            <div>
              <PostAddIcon />
              <input
                type="number"
                value={student.zipCode}
                name="zipCode"
                onChange={handleInputChange}
                placeholder="zipcode"
              />
            </div>
            <div className="department">
              <AccountTreeIcon />
              <select onChange={handleInputChange} value={student.departmentId} name="departmentId">
                <option value="" >Select Department</option>
                {Array.isArray(departments) && departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <PersonIcon />
              <input
                type="number"
                name="enrollmentNo"
                value={student.enrollmentNo}
                onChange={handleInputChange}
                placeholder="Entrollment number"
              />
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

export default CreateStudent;
