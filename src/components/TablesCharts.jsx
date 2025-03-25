

import React, { useEffect, useRef } from 'react';
import { MdIncompleteCircle, MdOutlineProductionQuantityLimits } from 'react-icons/md';

import { Bar , Pie} from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend , ArcElement} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);


const TablesCharts = () => {

    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    const salesData = [
        { totalSales: 650, qty: 100, yearDetails: { year: 2025, month: 1 }},
        { totalSales: 1200, qty: 205, yearDetails: { year: 2025, month: 2 }},
        { totalSales: 800, qty: 444, yearDetails: { year: 2025, month: 3 }},
    ];

    let categorySales =[
        {
            totalSales: 1,
            "genre": "Social Reform"
        },
        {
            totalSales: 2,
            "genre": "Fiction"
        },
        {
            totalSales: 1,
            genre: "Productivity"
        },
        {
            totalSales: 1,
            "genre": "Science"
        }
    ];

    useEffect(() => {
        if (barChartRef.current) barChartRef.current.destroy();
        if (pieChartRef.current) pieChartRef.current.destroy();
    }, [categorySales, salesData]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels: salesData.map(item => months[item.yearDetails.month - 1]),
        datasets: [
        {
            label: 'Total Sales Rs',
            data: salesData.map(item => item.totalSales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Quantity Sold',
            data: salesData.map(item => item.qty),
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
            position: 'top',
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

    const data1 = {
        labels: categorySales.map(item => item.genre),
        datasets: [
            {
                data: categorySales.map(item => item.totalSales),
                backgroundColor: [
                    '#FF6384', // Fiction
                    '#36A2EB', // Non-Fiction
                    '#FFCE56', // Science
                    '#4BC0C0', // History
                ],
                hoverBackgroundColor: [
                    '#FF4D6A',
                    '#1E90FF',
                    '#FFD700',
                    '#2E8B57',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const options1 = {
        responsive: true,
        plugins: {
            legend: {
            position: 'bottom',
            labels: {
                boxWidth: 1,
                padding: 1,
            },
            },
        },
    };
    

    return (
    <>
        <main className='mx-5 my-6 grid grid-cols-4 gap-x-4'>
            <div className="flex items-center p-2 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-pink-600 bg-pink-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <div>
                    <span className="block text-lg font-semibold">10</span>
                    <span className="block text-gray-500 text-sm">Total Books</span>
                </div>
            </div>

            {/* total sales */}
            <div className="flex items-center p-2 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <div>
                    <span className="block text-lg font-semibold">&#8377; 1250</span>
                    <span className="block text-sm text-gray-500">Total Sales</span>
                </div>
            </div>

            {/* total orders or something */}

            <div className="flex items-center p-2 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <MdOutlineProductionQuantityLimits className='size-6'/>
                </div>
                <div>
                    <span className="block text-lg font-semibold">4</span>
                    <span className="block text-sm text-gray-500">Total Orders Received</span>
                </div>
            </div>

            <div className="flex items-center p-2 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <MdIncompleteCircle className='size-6'/>
                </div>
                <div>
                    <span className="block text-lg font-semibold">7</span>
                    <span className="block text-sm text-gray-500">Total Quantity Sold</span>
                </div>
            </div>
        </main>

        <main className='mx-5 my-4 p-2 bg-white grid grid-cols-2 gap-x-10'>
            <div>
                <h2 className="text-center text-xl font-bold mb-4">Monthly Sales Report - 2025</h2>
                <Bar data={data} options={options} />
            </div>            
            <div className='max-w-sm '>
                <h2 className="text-center text-xl font-bold mb-4">Category Wise Sales Report - 2025</h2>
                <Pie data={data1} options={options1} />
            </div>
        </main>
    </>
    )
}

export default TablesCharts;
