import axios from 'axios'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react'
import BackgroundImage from "/Images/background.png"
import BarChart from './Charts/BarChart';


ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const Home = () => {
    const [studentCount, setStudentCount] = useState()
    const [studentCSECount, setStudentCSECount] = useState()
    const [studentITCount, setStudentITCount] = useState()

    // const [lineChartData, setLineChartData] = useState(null);
    // const [pieChartData, setPieChartData] = useState(null);
    // const [barChartData, setBarChartData] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:8080/studentCount')
            .then(res => {
                setStudentCount(res.data[0].Students)
            }).catch(err => console.log(err))

        axios.get('http://localhost:8080/studentCountCSE')
            .then(res => {
                setStudentCSECount(res.data[0].CSEStudents)
            }).catch(err => console.log(err))

        axios.get('http://localhost:8080/studentCountIT')
            .then(res => {
                setStudentITCount(res.data[0].ITStudents)
            }).catch(err => console.log(err))

        // fetchLineChartData();
        // fetchPieChartData();
        // fetchBarChartData();
    }, [])



    // const fetchLineChartData = () => {
    //     axios.get('http://localhost:8080/getUserCountByYear')
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 setLineChartData(res.data.Result);
    //             } else {
    //                 console.error('Error fetching line chart data');
    //             }
    //         })
    //         .catch(err => console.log(err));
    // };

    // const fetchPieChartData = () => {
    //     axios.get('http://localhost:8080/getPlacementCountByCompany')
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 setPieChartData(res.data.Result);
    //             } else {
    //                 console.error('Error fetching pie chart data');
    //             }
    //         })
    //         .catch(err => console.log(err));
    // };

    // const fetchBarChartData = () => {
    //     axios.get('http://localhost:8080/getPlaced2022')
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 setBarChartData(res.data.Result);
    //             } else {
    //                 console.error('Error fetching bar chart data');
    //             }
    //         })
    //         .catch(err => console.log(err));
    // };

    // const options = {
    //     maintainAspectRatio: false,
    //     aspectRatio: 1,
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //             ticks: {
    //                 stepSize: 0.5,
    //             },
    //         },
    //     },
    //     legend: {
    //         labels: {
    //             fontSize: 26,
    //         },
    //     },
    // };

    return (
        <div >
            <div className='px-3 d-flex justify-content-around mt-3'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Students</h4>

                    </div>
                    <hr />
                    <div className=''>
                        <h5>CSE: {studentCSECount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Students</h4>

                    </div>
                    <hr />
                    <div className=''>
                        <h5>IT: {studentITCount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Students</h4>

                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: {studentCount}</h5>
                    </div>
                </div>


            </div>


            <BarChart />
        </div>
    )
}

export default Home

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js'
// import { Bar } from 'react-chartjs-2';

// const Home = () => {
//     const [chartData, setChartData] = useState({});

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/getPlaced/2023'); // Replace with your API endpoint
//             const data = response.data.Result;
//             console.log(data);
//             if (data && data.length > 0) {
//                 const labels = data.map((item) => item.studentname); // Extract student names as labels
//                 const salaryData = data.map((item) => item.salaries); // Extract salaries as data

//                 setChartData({
//                     labels: labels,
//                     datasets: [
//                         {
//                             label: 'Salaries',
//                             data: salaryData,
//                             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                             borderWidth: 1,
//                         },
//                     ],
//                 });
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     return (
//         <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//             <div className='text-center pb-1'>
//                 <h4>Students</h4>
//             </div>
//             <hr />
//             <div>
//                 <h5>Total: {chartData.labels ? chartData.labels.length : 0}</h5>
//             </div>
//             <div>
//                 {chartData.labels && chartData.labels.length > 0 ? (
//                     <Bar data={chartData} options={{ maintainAspectRatio: false }} />
//                 ) : (
//                     <p>No data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;
