import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function AttendanceByDate() {
  const [attDate, setAttDate] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);
  const [absentStudent, setAbsentStudent] = useState([]);
  const [totalStd, setTotalStd] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [totalStds, setTotalStds] = useState([]);

  const ref = useRef();
  const getData = async () => {
    const response = await fetch(
      `https://localhost:7283/api/Attendance/datewise`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setAttDate(data.attendance);
      setTotalStd(data.totalStd);
      setTotalStds(data.totalStudents)
      console.log("hiiiiii", data);
    }
  };
  const viewPresentStd = (i, title) => {
    setPresentStudent(i);
    setModalTitle(title);
    setTimeout(() => {
      ref.current.click();
    }, 0);
  };

  const viewAbsentStd = (i, title) => {
    setAbsentStudent(i);
    setModalTitle(title);
    setTimeout(() => {
      ref.current.click();
    }, 0);
  };

  const viewTotalStd = (i, title) => {
    setTotalStds(i);
    setModalTitle(title);
    setTimeout(() => {
      ref.current.click();
    }, 0);
  };

  useEffect(() => {
    getData();
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
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
            </div>
            <div className="modal-body">
              {modalTitle === "Present Students" &&
                presentStudent.length > 0 && (
                  <table className="table mt-3 container table-success table-striped">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Enrollment No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {presentStudent.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{i + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.enrollmentNo}</td>
                          <td>{item.email}</td>
                          <td>{item.departmentName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              {modalTitle === "Present Students" &&
                presentStudent.length === 0 && (
                  <h6 className="text-center">No Present Student</h6>
                )}

              {modalTitle === "Absent Students" && absentStudent.length > 0 && (
                <table className="table mt-3 container table-danger table-striped">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Enrollment No</th>
                      <th scope="col">Email</th>
                      <th scope="col">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absentStudent.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.enrollmentNo}</td>
                        <td>{item.email}</td>
                        <td>{item.departmentName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {modalTitle === "Absent Students" &&
                absentStudent.length === 0 && (
                  <h6 className="text-center">No Absent Student</h6>
                )}

              {modalTitle === "Total Students" && totalStds.length > 0 && (
                <table className="table mt-3 container table-info table-striped">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Enrollment No</th>
                      <th scope="col">Email</th>
                      <th scope="col">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalStds.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.enrollmentNo}</td>
                        <td>{item.email}</td>
                        <td>{item.departmentName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {modalTitle === "Total Students" &&
                totalStds.length === 0 && (
                  <h6 className="text-center">No Student Found</h6>
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
      <div>
        {attDate.length > 0 ? (
          <table className="table mt-3 container table-secondary table-striped mt-5">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Present</th>
                <th scope="col">Absent</th>
                <th scope="col">Total Student</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(attDate) &&
                attDate.map((item, i) => (
                  <tr className="text-center" key={i}>
                    <td>{i + 1}</td>
                    <td>{item.date}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        viewPresentStd(item.presentStd, "Present Students")
                      }
                    >
                      {item.presentStd.length}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        viewAbsentStd(item.absentStd, "Absent Students")
                      }
                    >
                      {item.absentStd.length}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        viewTotalStd(item.totalStudents, "Total Students")
                      }
                    >
                      {totalStd}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <h5>No Record Found</h5>
        )}
      </div>
    </>
  );
}

export default AttendanceByDate;
