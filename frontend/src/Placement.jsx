import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const Placement = () => {
    const componentPDF = useRef()
    const [data, setData] = useState([])
    const [selectedYear, setSelectedYear] = useState("");
    // const [filteredColumns, setFilteredColumns] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/getPlaced')
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 console.log(res.data.Result);
    //                 setData(res.data.Result);
    //                 // setFilteredColumns([
    //                 //     'Reg.No',
    //                 //     'Name of the Student',
    //                 //     'Year',
    //                 //     'Dept',
    //                 //     'Placed Company',
    //                 //     'Designation',
    //                 //     'Salary Per Annum',
    //                 // ]);
    //             } else {
    //                 alert("Error")
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
        fetchData();
    }, [selectedYear])

    const fetchData = () => {
        let url = 'http://localhost:8080/getPlaced/'
        if (selectedYear) {
            url += `${selectedYear}`
        }
        axios.get(url)
            .then(res => {
                if (res.data.Status === 'Success') {
                    console.log(res.data.Result);
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    }
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Placementdata",
        // pageSize: 'A4',
        onAfterPrint: () => alert("Data saved in PDF")

    })

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Placement List</h3>
            </div>
            <Link to='/create' className='btn btn-success'>Add Student</Link>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Link to='/addPlacement' className='btn btn-success t'>Add Placement Details</Link>
            </div>
            <div className='mt-3'>
                <div>
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div ref={componentPDF} style={{ width: '100%' }}>
                    <table className='table'>
                        {/* <TableHeader columns={filteredColumns} /> */}
                        <thead>
                            <tr>
                                <th>Reg.No</th>
                                <th className='hide-on-print'>Image</th>
                                <th>Name of the Student</th>
                                <th className='hide-on-print'>Email</th>
                                <th>Year</th>
                                <th>Dept</th>
                                <th>Placed Company</th>
                                <th>Designation</th>
                                <th>Salary Per Annum</th>
                                <th className='hide-on-print'>Letter Of Intent</th>
                                <th className='hide-on-print'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => {
                                const companies = student.companies ? student.companies.split(',') : [];
                                const designations = student.designations ? student.designations.split(',') : [];
                                const salaries = student.salaries ? student.salaries.split(',') : [];
                                const lois = student.lois ? student.lois.split(',') : [];
                                return <tr key={index}>
                                    <td>{student.regNo}</td>
                                    <td className='action-buttons'>{
                                        <img src={`http://localhost:8080/images/` + student.image} alt="" className='student_image' />
                                    }</td>
                                    <td>{student.studentname}</td>
                                    <td className='action-buttons'>{student.email}</td>
                                    <td>{student.year}</td>
                                    <td>{student.dept}</td>
                                    <td>{student.companies}</td>
                                    <td>{student.designations}</td>
                                    <td>{student.salaries}</td>

                                    <td className='action-buttons'><a href={student.lois}>{student.loi}</a></td>
                                    <td className='action-buttons'>
                                        <Link to={`/studentEdit/` + student.regNo} className='btn btn-primary btn-sm me-2'>edit</Link>
                                        <Link to={`/selectDelete/` + student.regNo} className='btn btn-sm btn-danger'>delete</Link>
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

export default Placement