import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';

import axios from "axios";

const Home = () => {
    const [students, setStudents] = useState([])
    const [chartData, setChartData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/students/placement")
                setStudents(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/students/placement')
    //         .then(response => {
    //             const data = response.data;
    //             const years = {};
    //             const salaries = {};

    //             data.forEach(student => {
    //                 if (!years[student.year]) {
    //                     years[student.year] = 1;
    //                     salaries[student.year] = student.salary;
    //                 } else {
    //                     years[student.year]++;
    //                     salaries[student.year] += student.salary;
    //                 }
    //             });

    //             const avgSalaries = Object.keys(years).map(year => {
    //                 return salaries[year] / years[year];
    //             });

    //             setChartData({
    //                 labels: Object.keys(years),
    //                 datasets: [{
    //                     label: 'Average Salary',
    //                     data: avgSalaries,
    //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //                     borderColor: 'rgba(54, 162, 235, 1)',
    //                     borderWidth: 1
    //                 }]
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);


    return (
        <div className='home'>
            {/* <Bar data={chartData} /> */}
        </div>
    )
}

export default Home