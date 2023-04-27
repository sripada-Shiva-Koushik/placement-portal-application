import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const Internship = () => {
    const [students, getStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([])
    // const [selectedYear, setSelectedYear] = useState(2021);


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

    const handleSearch = () => {
        const newfilteredStudents = students.filter(student => {
            return student.company.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredStudents(newfilteredStudents)
    }

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

    return (

        <div>
            <input type="text" placeholder='Search' onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
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
                    </tr>
                </thead>
                <tbody>
                    {searchTerm === '' ? (
                        students.map(student => (
                            <tr key={student.rid}>
                                <td>{student.rid}</td>
                                <td>{student.username}</td>
                                <td>{student.company}</td>
                                <td>{student.salary}</td>
                                <td>{student.year}</td>
                            </tr>
                        ))
                    ) : (
                        filteredStudents.map(student => (
                            <tr key={student.rid}>
                                <td>{student.rid}</td>
                                <td>{student.username}</td>
                                <td>{student.company}</td>
                                <td>{student.salary}</td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
        // <div>
        //     <h1>Placement Data</h1>
        //     <ul>
        //         {students.map(item => (
        //             <li key={item.id}>
        //                 {item.name} - {item.placement}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
}

export default Internship