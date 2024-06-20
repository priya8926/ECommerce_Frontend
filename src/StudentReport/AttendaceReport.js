import React, { useEffect, useRef, useState } from "react";

function AttendaceReport() {
  const [report, setReport] = useState([]);
  const [presentStd, setPresentStd] = useState([]);
  const [absentStd, setAbsentStd] = useState([]);
  const ref = useRef();

  const getAllDate = async () => {
    const response = await fetch(
      `https://localhost:7283/api/Attendance/report`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setReport(data);
    }
  };
  const viewData = (item) => {
    ref.current.click();
    setPresentStd(item.presentStudents);
    setAbsentStd(item.absentStudents);
    console.log(item, "item");
  };
  useEffect(() => {
    getAllDate();
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
                Student Attendace Report
              </h5>
            </div>
            <h6 className="px-5 mt-3">
              <strong>Present Students : </strong>
            </h6>
            <div className="modal-body">
              { presentStd.length > 0 ? (
                <table className="table mt-3 container table-primary table-striped">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Enrollment No</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(presentStd) &&
                      presentStd.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{i + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td> {item.enrollmentNo}</td>
                          <td>{item.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <h6 className="text-center">No Present Student</h6>
              )}
            </div>
            <h6 className="px-5 mt-3">
              <strong>Absent Students : </strong>
            </h6>
            <div className="modal-body">
              {absentStd.length > 0 ? (
                <table className="table mt-3 container table-danger table-striped">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Enrollment No</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(absentStd) &&
                      absentStd.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{i + 1}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td> {item.enrollmentNo}</td>
                          <td>{item.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <h6 className="text-center">No Absent Student</h6>
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
      <div className="pt-3 pb-5">
        <table className="table mt-3 container  table-success table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Department</th>
              <th scope="col">Present</th>
              <th scope="col">Absent</th>
              <th scope="col">Total Students</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(report) &&
              report.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>{i + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.departmentName}</td>
                  <td>{item.presentStudents.length}</td>
                  <td>{item.absentStudents.length}</td>
                  <td>{item.totalStd}</td>
                  <td>
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "#3e4aea" }}
                      onClick={() => viewData(item)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AttendaceReport;
