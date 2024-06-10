import React, { useEffect, useState } from "react";

function Department() {
  const [department, setDepartment] = useState([]);

  const getStdByDepartment = async (department) => {
    try {
      const response = await fetch(
        `https://localhost:7283/api/Student/all`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("department", data);
        setDepartment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStdByDepartment();
  }, []);

  return <></>;
}

export default Department;
