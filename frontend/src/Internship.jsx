import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const Internship = () => {
    const componentPDF = useRef()
    const [data, setData] = useState([])
    const [selectedYear, setSelectedYear] = useState("");
    // const [filteredColumns, setFilteredColumns] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedYear])

    const fetchData = () => {
        let url = 'http://localhost:8080/getIntern/'
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

    // useEffect(() => {
    //     axios.get('http://localhost:8080/getIntern')
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
            </div><em>
                <Link to='/create' className='btn btn-outline-primary'>Add Student</Link></em>
            <div class="d-flex flex-row-column">
                <h3><em><Link to='/addPlacement' className='btn btn-outline-primary'>Internship Details</Link></em></h3>
                <div class="d-flex flex-row-reverse"></div>
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
                                {/* <th>Image</th> */}
                                <th>Name of the Student</th>
                                <th>Year</th>
                                {/* <th>Email</th> */}
                                {/* <th>Dept</th> */}
                                <th>Name of The Company</th>
                                <th>From</th>
                                <th>To</th>
                                {/* <th>Loi</th> */}
                                <th className='hide-on-print'>Letter Of Intent</th>
                                <th className='hide-on-print'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => {
                                const companies = student.companies ? student.companies.split(',') : [];
                                const froms = student.froms ? student.designations.split(',') : [];
                                const tos = student.tos ? student.salaries.split(',') : [];
                                // const lois = student.lois ? student.lois.split(',') : [];
                                return <tr key={index}>
                                    <td>{student.regNo}</td>
                                    {/* <td>{
                                        <img src={`http://localhost:8080/images/` + student.image} alt="" className='student_image' />
                                    }</td> */}
                                    <td>{student.studentname}</td>
                                    <td>{student.year}</td>
                                    {/* <td>{student.email}</td> */}
                                    {/* <td>{student.year}</td> */}
                                    {/* <td>{student.dept}</td> */}
                                    <td>{student.companies}</td>
                                    <td>{student.from_date}</td>
                                    <td>{student.to_date}</td>
                                    {/* <td className='action-buttons'>{student.lois}</td> */}
                                    {/* <td><a href={student.lois}>{student.loi}</a></td> */}
                                    {/* <td>
                                        <Link to={`/studentEdit/` + student.regNo} className='btn btn-primary btn-sm me-2'>edit</Link>
                                        <button className='btn btn-sm btn-danger'>delete</button>
                                    </td> */}
                                    <td className='action-buttons'>
                                        <button className='btn btn-outline-primary' onClick={() => window.open(`http://localhost:8080/lois/${student.loi}`, '_blank')}>
                                            Open PDF
                                        </button>
                                    </td>
                                    <td className='action-buttons'>
                                        <Link to={`/selectInternEdit/` + student.regNo} className='btn btn-outline-primary'>edit</Link>
                                        <button className='btn btn-outline-danger'>delete</button>
                                    </td>




                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-primary' onClick={generatePDF}>Print</button>
            </div>
        </div>
    )
}

export default Internship