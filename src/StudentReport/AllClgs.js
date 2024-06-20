import React, { useEffect, useRef, useState } from "react";

function AllClgs() {
  const ref = useRef();
  const [clg, setClg] = useState([]);
  const [selectedClg, setSelectedclg] = useState([]);

  const getAllClg = async () => {
    const response = await fetch(`https://localhost:7283/api/College/all`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setClg(data);
    }
  };
  const ShowData = async (item) => {
    setSelectedclg(item);
    console.log(item)
    ref.current.click();
  };
  useEffect(() => {
    getAllClg();
  }, []);
  return (
    <>
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
                 Departments
                </h5>
              </div>
              <div>
                {selectedClg.map((item , i) =>(
                    <div className="modal-body" key={i}>
                        <p>{item.departmentName}</p>
                    </div>

                ))}
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
      </>
      <div>
        {clg.length > 0 ? (
          <table className="table mt-3 container  table-warning table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">College Name</th>
                <th scope="col">Departments</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {clg.map((i, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{i.collegeName}</td>
                    <td>
                      <i
                        className="fa-solid fa-eye"
                        style={{ color: "#3e4aea" }}
                        onClick={() => ShowData(i.departmentName)}
                      />
                    </td>
                    <td>
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "#db3d45" }}  
                        />
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="container m-5">
            <h4>No Record Found!!</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default AllClgs;
