import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

const AdminPlacement = () => {
    const [students, getStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([])
    // const history = useHistory()
    const [selectedYear, setSelectedYear] = useState(2021);


    useEffect(() => {
        axios.get('http://localhost:8000/api/students/placement')
            .then(response => {
                getStudents(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // const handleSearch = () => {
    //     const newfilteredStudents = students.filter(student => {
    //         return student.company.toLowerCase().includes(searchTerm.toLowerCase());
    //     });
    //     setFilteredStudents(newfilteredStudents)
    // }

    // const handleUpdate = (student, history) => {
    // navigate to the update page for the selected student
    // you can use the student ID or any other identifier to construct the URL for the update page
    // window.location.href = `/admin/placement/${student.rid}/update`; // example URL format
    // history.push(`/admin/placement/${student.rid}/update`)
    // const url = `/admin/placement/update?rid=${student.rid}&username=${student.username}`;
    // history.push(url);

    // set the selected student in state
    // setSelectedStudent(student);
    // // navigate to the update page
    // history.push(`/admin/placement/${student.rid}/update`);

    // }


    // const filteredStudentsByYear = (students) =>{
    //     return students.filter(student =>{
    //         return student.year === selectedYear;
    //     })
    // }

    // const handleSearchYear = () =>{
    //     if (searchTerm === ''){
    //         const filteredStudentsByYear = filterStudentsByYear(students);
    //         setFilteredStudents(filteredStudentsByYear);
    //     } else {
    //         const newfilteredStudents = students.filter(student = >{
    //             return student.co
    //         })
    //     }
    //     }
    // }

    useEffect(() => {
        setFilteredStudents(filterStudents(students, selectedYear, searchTerm));
    }, [students, selectedYear, searchTerm]);

    const handleSearch = () => {
        setFilteredStudents(filterStudents(students, selectedYear, searchTerm));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const yearOptions = () => {
        const years = students.map(student => student.year)
        const uniqueYears = [...new Set(years)]
        return uniqueYears.map(year => (
            <option value={year} key={year}>{year}</option>
        ))
    }

    const filterStudents = (students, year, searchTerm) => {
        let filteredStudentsByYear = students.filter(student => {
            return student.year === year;
        });

        if (searchTerm) {
            filteredStudentsByYear = filteredStudentsByYear.filter(student => {
                return student.company.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        return filteredStudentsByYear;
    }

    return (
        // <React.Fragment>
        <div>
            <div>
                <label htmlFor="year">Year:</label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {yearOptions()}
                </select>
            </div>
            <div>
                <input type="text" placeholder='Search by company name' onChange={e => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <Link to={`/add`}>Add new Placement Details</Link>
            <Link to={`/update`}>Update</Link>
            {/* <input type="text" placeholder='Search' onChange={e => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button> */}
            {/* <input type="number" placeholder='Year' onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={handleSearchYear}>Search</button> */}
            <h1>Student List</h1>
            <table class="table table-border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Company</th>
                        <th>Salary</th>
                        <th>Year</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student.rid}>
                            <td>{student.rid}</td>
                            <td>{student.username}</td>
                            <td>{student.company}</td>
                            <td>{student.salary}</td>
                            <td>{student.year}</td>
                            <Link to={`/update/${student.rid}`} className='btn btn-sm btn-info'>Edit</Link>
                            <Link to={`/placement/delete/${student.rid}`} className='btn btn-sm btn-info'>Delete</Link>
                            {/* <button className='btn btn-sm btn-danger' onClick={() => {
                                if (window.confirm("Are you sure you want to delete this row?")) {
                                    // Perform deletion
                                    axios.delete(`http://localhost:8000/api/students/placement/delete/${student.rid}`)
                                        .then(response => {
                                            // Remove deleted row from state
                                            const updatedStudents = students.filter(s => s.rid !== student.rid);
                                            getStudents(updatedStudents);
                                            console.log(response.data);
                                        });
                                }
                            }}>Delete</button> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        // </React.Fragment>
    );
}

export default AdminPlacement;