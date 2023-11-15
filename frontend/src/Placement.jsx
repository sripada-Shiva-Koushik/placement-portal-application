import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const Placement = () => {
    const componentPDF = useRef()
    const [data, setData] = useState([])
    const [selectedYear, setSelectedYear] = useState("");
    const [companyNameFilter, setCompanyNameFilter] = useState("");

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

    const filteredData = data.filter((student) =>
        student.companies ? student.companies.includes(companyNameFilter) : false
    );

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3><em>Placement List</em></h3>
            </div><em>

                <Link to='/create' className='btn btn-outline-primary'>Add Student</Link></em>
            <div class="d-flex flex-row-column">
                <h3><em><Link to='/addPlacement' className='btn btn-outline-primary'>Add Placement Details</Link></em></h3>
                <div class="d-flex flex-row-reverse"></div>
            </div>
            <div><em>
                <input
                    type="text"
                    placeholder="Search by Company Name"
                    value={companyNameFilter}
                    onChange={(e) => setCompanyNameFilter(e.target.value)}
                />


            </em></div>
            <div className='mt-3'>
                <div>
                    <select value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                {/* <div className='table-responsive'> */}
                {/* <div ref={componentPDF} style={{ width: '100%' }} > */}
                <div ref={componentPDF} className='table-container' style={{ overflowX: "auto" }} >
                    {/* <div className='table-wrapper'> */}
                    <table className='table '>
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
                                <th className='hide-on-print'>Designation</th>
                                <th>Salary Per Annum</th>
                                <th className='hide-on-print'>Letter Of Intent</th>
                                <th className='hide-on-print'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data.map((student, index) => {
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
                                        <td className='action-buttons'>{student.designations}</td>
                                        <td>{student.salaries}</td>

                                        {/* <td className='action-buttons'><a href={student.lois}>{student.loi}</a></td> */}
                            {/* <td className='action-buttons'>
                                        <button className='btn btn-link' onClick={() => window.open(`http://localhost:8080/lois/${student.loi}`, '_blank')}>
                                            Open PDF
                                        </button>
                                    </td> */}
                            {/* <td className='action-buttons'>
                                            {lois.map((loi, index) => (
                                                <button
                                                    key={index}
                                                    // className='btn btn-link'
                                                    className='btn btn-primary btn-sm me-2'
                                                    onClick={() => window.open(`http://localhost:8080/lois/${loi}`, '_blank')}
                                                >
                                                    Open PDF {index + 1}
                                                </button>
                                            ))}
                                        </td>
                                        <td className='action-buttons'>
                                            <Link to={`/studentEdit/` + student.regNo} className='btn btn-primary btn-sm me-2'>edit</Link>
                                            <Link to={`/selectDelete/` + student.regNo} className='btn btn-sm btn-danger'>delete</Link>
                                        </td>
                                    </tr>
                                // })} */}

                            {data
                                .filter((student) =>
                                    student.companies ? student.companies.includes(companyNameFilter) : false
                                )
                                .map((student, index) => {
                                    const companies = student.companies ? student.companies.split(',') : []
                                    const designations = student.designations ? student.designations.split(',') : []
                                    const salaries = student.salaries ? student.salaries.split(',') : []
                                    const lois = student.lois ? student.lois.split(',') : []
                                    const maxRowCount = Math.max(
                                        companies.length,
                                        designations.length,
                                        salaries.length,
                                        lois.length
                                    )
                                    return (
                                        <React.Fragment key={index}>
                                            {Array.from({ length: maxRowCount }).map((_, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {rowIndex === 0 && (
                                                        <>
                                                            <td rowSpan={maxRowCount}>{student.regNo}</td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {<img src={`http://localhost:8080/images/` + student.image} alt='' className='student_image' />}
                                                            </td>
                                                            <td rowSpan={maxRowCount}>{student.studentname}</td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {student.email}
                                                            </td>
                                                            <td rowSpan={maxRowCount}>{student.year}</td>
                                                            <td rowSpan={maxRowCount}>{student.dept}</td>
                                                        </>
                                                    )}
                                                    <td>{companies[rowIndex]}</td>
                                                    <td className='action-buttons'>{designations[rowIndex]}</td>
                                                    <td>{salaries[rowIndex]}</td>
                                                    {rowIndex === 0 && (
                                                        <>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {lois.map((loi, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className='btn btn-outline-primary'
                                                                        onClick={() => window.open(`http://localhost:8080/lois/${loi}`, '_blank')}
                                                                    >
                                                                        Open PDF {index + 1}
                                                                    </button>
                                                                ))}
                                                            </td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                <Link to={`/studentEdit/` + student.regNo} className='btn btn-outline-primary'>
                                                                    edit
                                                                </Link>
                                                                <Link to={`/selectDelete/` + student.regNo} className='btn btn-outline-danger'>
                                                                    delete
                                                                </Link>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                {/* </div> */}
                <button className='btn btn-outline-primary' onClick={generatePDF}>Print</button>
            </div>
        </div >
    )
}

export default Placement