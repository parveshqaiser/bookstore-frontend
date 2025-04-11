
import React, { useEffect, useRef } from 'react';
import { Bar , Pie} from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend , ArcElement} from 'chart.js';
import { useSelector } from 'react-redux';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const DashboardGraphs = () => {

    let {monthlySales} = useSelector(store => store?.dashboard);
    const barChartRef = useRef(null);
    // const pieChartRef = useRef(null);

    const salesData = [
        { totalSales: 100, qty: 10, yearDetails: { year: 2025, month: 1 }},
        { totalSales: 120, qty: 20, yearDetails: { year: 2025, month: 2 }},
        { totalSales: 140, qty: 30, yearDetails: { year: 2025, month: 3 }},
        { totalSales: 150, qty: 40, yearDetails: { year: 2025, month: 4 }},
        { totalSales: 160, qty: 50, yearDetails: { year: 2025, month: 5 }},
        { totalSales: 170, qty: 60, yearDetails: { year: 2025, month: 6 }},
    ];

    useEffect(() => {
        if (barChartRef.current) barChartRef.current.destroy();
    }, [salesData]);

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

    return (
        <main className='max-w-7xl mx-auto px-2 overflow-x-auto'>
            <div className='my-5 lg:w-2xl mx-auto'>
                <h2 className="text-center lg:text-xl md:text-lg text-base font-bold mb-4">Monthly Sales Report - 2025</h2>
                {monthlySales.length >0 ? <Bar data={barLegend} options={options} />
                : <p className='text-center'>No Record Found</p>}
            </div>     
        </main>
    )
}

export default DashboardGraphs
