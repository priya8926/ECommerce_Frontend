import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function StudentDetails() {
    const[stdDetails , setStdDetails] = useState([])
    const params = useParams()

    const getDeatils = async() =>{
        const response = await fetch(`https://localhost:7283/api/Department/studentDetails/${params.id}`,{
            method : "GET"
        })
        if(response.ok){
            const data = await response.json()
            console.log(data , "details")
            setStdDetails(data)
        }
    }
    useEffect(() =>{
        getDeatils()
    },[])
  return (
    <>
    {stdDetails.length> 0 ? (
     <table className="table mt-5 mb-5 container table-secondary table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Enrollment No</th>
              <th scope="col">Term Fees</th>
              <th scope="col">Contact</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {stdDetails.map((item , i) =>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.enrollmentNo}</td>
                    <td>{item.fees}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.zipCode}</td>
                </tr>
            ))}
          </tbody>
          </table>
          ) : 
          <div className='container mt-5 '>
          <h3 className='text-center'>No Record Found!!</h3>
          </div>}
          <div className='container text-center mt-5'>
            <Link to="/department">
            <button className='btn btn-primary'>Go Back</button>
            </Link>
          </div>
    </>
  )
}

export default StudentDetails
