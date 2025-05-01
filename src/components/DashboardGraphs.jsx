
import React, { useEffect, useRef } from 'react';
import { Bar , Pie} from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend , ArcElement} from 'chart.js';
import { useSelector } from 'react-redux';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const DashboardGraphs = () => {

    let {monthlySales , categoryWiseSales} = useSelector(store => store?.dashboard);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const barLegend = {
        labels: monthlySales.map(item => months[item.yearDetails.month - 1]),
        datasets: [
        {
            label: 'Total Sales in $',
            data: monthlySales.map(item => item.totalSales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Quantity Sold',
            data: monthlySales.map(item => item.qty),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
        },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const pieData = {
        labels: !!categoryWiseSales && categoryWiseSales.map(val => val?.genre),
        datasets: [
            {
                label: 'Total Items',
                data: !!categoryWiseSales && categoryWiseSales.map(val => val?.totalItemSold),
                backgroundColor: [
                    '#FF6384', // Pinkish Red
                    '#36A2EB', // Light Blue
                    '#FFCE56', // Yellow
                    '#4BC0C0', // Teal
                    '#9966FF', // Purple
                    '#FF9F40', // Orange
                    '#C9CBCF', // Light Gray
                    '#8BC34A', // Lime Green
                    '#00ACC1', // Cyan
                    '#F44336', // Red
                    '#3F51B5', // Indigo
                    '#009688', // Teal Darker
                    '#CDDC39', // Lime
                    '#9C27B0', // Dark Purple
                    '#795548', // Brown
                    '#607D8B', // Blue Gray
                    '#E91E63', // Pink
                    '#2196F3'  // Blue
                ],
                borderWidth: 0,
            },
            ],
        };
      
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <main className='max-w-7xl mx-auto px-2 overflow-x-auto'>
            <div className='flex flex-wrap mt-10'>
                <div className='lg:w-2xl mx-auto'>
                    <h2 className="text-center lg:text-xl md:text-lg text-base font-bold mb-4">Monthly Sales Report - 2025</h2>
                    {monthlySales.length >0 ? <Bar data={barLegend} options={options} />
                    : <p className='text-center'>No Record Found</p>}
                </div>

                <div className='w-full max-w-md mx-auto'>
                    <h2 className="text-center lg:text-xl md:text-lg text-base font-bold mb-4">Book Sales By Category</h2>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </main>
    )
}

export default DashboardGraphs
