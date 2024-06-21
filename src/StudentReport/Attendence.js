import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Attendence() {
  const [student, setStudent] = useState([]);
  const [selectedStd, setSelectedStd] = useState("");
  const [isPresent, setIsPresent] = useState("");
  const [remark, setRemark] = useState("");
  const [allAtd, setAllAtd] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const columns = [
    { field: "id", headerName: "#", minWidth: 50 },
    { field: "date", headerName: "Date", minWidth: 200, flex: 0.5 },
    { field: "firstName", headerName: "First Name", minWidth: 100, flex: 0.3 },
    { field: "lastName", headerName: "Last Name", minWidth: 100, flex: 0.5 },
    {
      field: "enrollmentNo",
      headerName: "Enrollment No",
      minWidth: 50,
      flex: 0.5,
    },
    { field: "department", headerName: "Department", minWidth: 200, flex: 0.5 },
    { field: "isPresent", headerName: "IsPresent", minWidth: 70, flex: 0.5 },
    { field: "remark", headerName: "Remark", minWidth: 100, flex: 0.5 },
  ];

  const rows = allAtd.map((item, index) => ({
    id: index + 1,
    firstName: item.firstName,
    lastName: item.lastName,
    date: item.date,
    enrollmentNo: item.enrollmentNo,
    department: item.departmentName,
    isPresent: item.isPresent,
    remark: item.remark,
  }));

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
    atteByDate(e.target.value);
  };

  const addAttendance = async () => {
    try {
      // const formattedDate = new Date().toISOString();
      const response = await fetch(
        `https://localhost:7283/api/Attendance/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentID: selectedStd,
            date: selectedDate,
            isPresent,
            remark,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        getAllAtd(pageNumber, pageSize);
        if (data.result) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAtd = async (pageNumber, pageSize) => {
    try {
      const link = `https://localhost:7283/api/Attendance/all?pageNo=${pageNumber}&pageSize=${pageSize}`;
      const response = await fetch(link, {
        method: "GET",
      });
      console.log(link);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAllAtd(data.data);
        setTotalRecords(data.totalRecords);
        const uniqueDates = [...new Set(data.data.map((item) => item.date))];
        setDate(uniqueDates);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const atteByDate = async (selectedDate) => {
    try {
      const response = await fetch(
        `https://localhost:7283/api/Attendance/${selectedDate}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAllAtd(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStd();
    if (!selectedDate) {
      getAllAtd(pageNumber, pageSize);
    } else {
      atteByDate(selectedDate);
    }
  }, [selectedDate, pageNumber, pageSize]);
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
                value={selectedDate}
                onChange={handleDateChange}
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

      <div
        className="mx-3 mt-4 d-flex"
        style={{ justifyContent: "space-evenly" }}
      >
        <div>
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
        <div>
          <input type="text" placeholder="Search..." />
          <button className="btn btn-primary mx-2">Search</button>
        </div>
      </div>

      <div>
        {allAtd.length > 0 ? (
          <div className="container">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              autoHeight
              rowCount={totalRecords}
              sortingOrder={["asc", "desc"]}
              disableRowSelectionOnClick
              className="table-success m-5"
              paginationMode="server"
              // onPageSizeChange={handlePageSizeChange}
              // onPageChange={handlePageChange}
              pagination={true}
              paginationModel={{ page: pageNumber, pageSize }}
              onPaginationModelChange={(params) => {
                setPageNumber(params.page);
                setPageSize(params.pageSize);
              }}
            />
          </div>
        ) : (
          <div className="container text-center mt-5">
            <h4>No Record!!</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Attendence;
