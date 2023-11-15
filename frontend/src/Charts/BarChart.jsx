import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';


ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement
)


const BarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);

    useEffect(() => {
        fetchData();
        // fetchLineChartData();
        // fetchPieChartData();
    }, []);

    const fetchData = () => {
        let url = 'http://localhost:8080/getPlaced2022';
        axios
            .get(url)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setChartData(res.data.Result);
                } else {
                    alert('Error');
                }
            })
            .catch(err => console.log(err));
    };

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


    const options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 0.5,
                },
            },
        },
        legend: {
            labels: {
                fontSize: 26,
            },
        },
    };

    return (
        <div>
            <div style={{ height: '300px', justifyContent: 'start', display: 'flex' }}>

                {chartData && (
                    <Bar data={chartData} width={200} options={options} />
                )}
            </div>
            {/* <div style={{ height: '200px', maxWidth: '300px', justifyContent: 'end', display: 'flex' }}>

                {chartData && (
                    <LineElement data={lineChartData} width={200} options={options} />
                )}
            </div>
            <div style={{ height: '200px', maxWidth: '300px' }}>

                {chartData && (
                    <Pie data={pieChartData} width={200} options={options} />
                )}
            </div> */}
            <h5 style={{ justifyContent: 'center', display: 'flex' }}>No. of Students</h5>
        </div>

    );
};

export default BarChart;
