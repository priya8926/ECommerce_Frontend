import React, { useEffect, useState } from "react";

function Attendence() {
  const [student, setStudent] = useState([]);
  const [selectedStd, setSelectedStd] = useState(null);
  const [date, setDate] = useState([]);
  const [isPresent, setIsPresent] = useState("");
  const [remark, setRemark] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [allAtd, setAllAtd] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const getAllStd = async () => {
    try {
      const response = await fetch(`https://localhost:7283/api/Student/all`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStudentChange = (e) => {
    setSelectedStd(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const addAttendance = async () => {
    try {
      const response = await fetch(
        `https://localhost:7283/api/Attendance/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentID: selectedStd,
            date,
            isPresent,
            remark,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        getAllAtd();
        setAttendance(data);
        alert("attendace added");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAtd = async () => {
    try {
      const response = await fetch(
        `https://localhost:7283/api/Attendance/all`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAllAtd(data);
        const uniqueDates = [...new Set(data.map((item) => item.date))];
        setDate(uniqueDates);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStd();
    getAllAtd();
  }, []);
  return (
    <>
      <div className="d-flex mt-5 container">
        <div>
          <span>
            <strong>Choose Student: </strong>
          </span>
          <select
            onChange={handleStudentChange}
            value={selectedStd}
            name="selectedStd"
            className="w-50 text-center"
          >
            <option value="">Select Student</option>
            {Array.isArray(student) &&
              student.map((s) => (
                <option key={s.studentID} value={s.studentID}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
          </select>
        </div>
        {selectedStd && (
          <div>
            <span>
              <label htmlFor="attendanceDate">Select Date : </label>
              <input
                type="date"
                id="attendanceDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </span>
            {date && (
              <div className="container">
                <div>
                  <label htmlFor="isPresent">IsPresent : </label>
                  <span>
                    <input
                      type="radio"
                      id="present"
                      name="isPresent"
                      value="yes"
                      checked={isPresent === "yes"}
                      onChange={(e) => setIsPresent(e.target.value)}
                    />
                    <label htmlFor="present">yes</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      id="absent"
                      name="isPresent"
                      value="no"
                      checked={isPresent === "no"}
                      onChange={(e) => setIsPresent(e.target.value)}
                    />
                    <label htmlFor="present">no</label>
                  </span>
                </div>
                <div>
                  <label htmlFor="remarks">Remarks:</label>
                  <input
                    type="text"
                    id="remarks"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="text-center m-3">
              <button className="btn btn-primary" onClick={addAttendance}>
                Add Attendance
              </button>
            </div>
          </div>
        )}
      </div>
      <h4 className="text-center mt-4">Student's Attendance Report</h4>
      <div className="mx-3">
        <span>
          <strong>Sort By Date : </strong>
        </span>
        <select
          onChange={handleDateChange}
          value={selectedDate}
          name="selectedDate"
          className="text-center"
        >
          <option value="">Select Date</option>
          {Array.isArray(date) &&
            date.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
        </select>
      </div>
      {allAtd.length > 0 ? (
        <table className="table mt-3 container  table-warning table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Enrollment No</th>
              <th scope="col">Deparment</th>
              <th scope="col">IsPresent</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
            {allAtd.map((i, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{i.date}</td>
                <td>{i.firstName}</td>
                <td>{i.lastName}</td>
                <td>{i.enrollmentNo}</td>
                <td>{i.departmentName}</td>
                <td>{i.isPresent}</td>
                <td>{i.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="container text-center mt-5">
          <h4>No Record!!</h4>
        </div>
      )}
    </>
  );
}

export default Attendence;
