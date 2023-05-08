import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const Internship = () => {
    const componentPDF = useRef()
    const [data, setData] = useState([])
    // const [filteredColumns, setFilteredColumns] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getIntern')
            .then(res => {
                if (res.data.Status === 'Success') {
                    console.log(res.data.Result);
                    setData(res.data.Result);
                    // setFilteredColumns([
                    //     'Reg.No',
                    //     'Name of the Student',
                    //     'Year',
                    //     'Dept',
                    //     'Placed Company',
                    //     'Designation',
                    //     'Salary Per Annum',
                    // ]);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Intenshipdata",
        pageSize: 'A4',
        onAfterPrint: () => alert("Data saved in PDF")

    })

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Internship List</h3>
            </div>
            <Link to='/create' className='btn btn-success'>Add Student</Link>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Link to='/addPlacement' className='btn btn-success t'>Add Intenship Details</Link>
            </div>
            <div className='mt-3'>
                <div ref={componentPDF} style={{ width: '100%' }}>
                    <table className='table'>
                        {/* <TableHeader columns={filteredColumns} /> */}
                        <thead>
                            <tr>
                                <th>Reg.No</th>
                                {/* <th>Image</th> */}
                                <th>Name of the Student</th>
                                {/* <th>Email</th> */}
                                {/* <th>Year</th>
                                <th>Dept</th> */}
                                <th>Name of The Company</th>
                                <th>From</th>
                                <th>To</th>
                                {/* <th>Letter Of Intent</th>
                                <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => {
                                const companies = student.companies ? student.companies.split(',') : [];
                                const froms = student.froms ? student.designations.split(',') : [];
                                const tos = student.tos ? student.salaries.split(',') : [];
                                const lois = student.lois ? student.lois.split(',') : [];
                                return <tr key={index}>
                                    <td>{student.regNo}</td>
                                    {/* <td>{
                                        <img src={`http://localhost:8080/images/` + student.image} alt="" className='student_image' />
                                    }</td> */}
                                    <td>{student.studentname}</td>
                                    {/* <td>{student.email}</td> */}
                                    {/* <td>{student.year}</td> */}
                                    {/* <td>{student.dept}</td> */}
                                    <td>{student.companies}</td>
                                    <td>{student.from_date}</td>
                                    <td>{student.to_date}</td>

                                    {/* <td><a href={student.lois}>{student.loi}</a></td> */}
                                    {/* <td>
                                        <Link to={`/studentEdit/` + student.regNo} className='btn btn-primary btn-sm me-2'>edit</Link>
                                        <button className='btn btn-sm btn-danger'>delete</button>
                                    </td> */}
                                    <td className='action-buttons'>
  <Link to={`/studentEdit/` + student.regNo} className='btn btn-primary btn-sm me-2'>edit</Link>
  <button className='btn btn-sm btn-danger'>delete</button>
</td>




                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-success' onClick={generatePDF}>Print</button>
            </div>
        </div>
    )
}

export default Internship