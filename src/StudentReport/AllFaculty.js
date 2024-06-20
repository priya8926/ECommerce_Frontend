import React, { useEffect, useState } from "react";

function AllFaculty() {
  const [faculty, setFaculty] = useState([]);

  const getAllFaculty = async () => {
    const response = await fetch(
      `https://localhost:7283/api/College/getFaculty`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setFaculty(data);
    }
  };
  useEffect(() =>{
    getAllFaculty()
  },[])
  return (
    <>
      <div className="mt-5">
        {faculty.length > 0 ? (
          <table className="table mt-3 container  table-success table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">College Name</th>
                <th scope="col">Faculty Name</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
                {faculty.map((item , index) =>(
                    <tr key={index} className="text-center">
                        <td>{index+1}</td>
                        <td>{item.college}</td>
                        <td>{item.name}</td>
                        <td>{item.departmentName}</td>
                    </tr>
                ))}
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

export default AllFaculty;
