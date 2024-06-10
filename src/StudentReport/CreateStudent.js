import React, { useState } from "react";
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
    address: "",
    city: "",
    state: "",
    zipCode: "",
    enrollmentNo: "",
    department :""
  });
  const departments = [
    "Computer Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    " Biomedical Engineering",
    "  Aerospace Engineering",
    "Civil Engineering",
    "Information Technology",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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
      console.log("error creatinf student report", error);
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
              <select onChange={handleInputChange} value={student.department} name="department">
                <option value="" >Select Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
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
