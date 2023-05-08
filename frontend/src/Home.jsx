// import React from 'react'

// const Home = () => {
//     return (
//         <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//             <div className='text-center pb-1'>
//                 <h4>Students</h4>

//             </div>
//             <hr />
//             <div className=''>
//                 <h5>Total: { }</h5>
//             </div>
//             <div></div>
//         </div>
//     )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Home = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getPlaced/2023'); // Replace with your API endpoint
            const data = response.data.Result;
            console.log(data);
            if (data && data.length > 0) {
                const labels = data.map((item) => item.studentname); // Extract student names as labels
                const salaryData = data.map((item) => item.salaries); // Extract salaries as data

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Salaries',
                            data: salaryData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Students</h4>
            </div>
            <hr />
            <div>
                <h5>Total: {chartData.labels ? chartData.labels.length : 0}</h5>
            </div>
            <div>
                {chartData.labels && chartData.labels.length > 0 ? (
                    <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
