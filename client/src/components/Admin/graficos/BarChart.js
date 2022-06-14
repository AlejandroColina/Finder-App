import React from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler)


export default function BarChart() {
    const totalByTypes = useSelector((state) => state.usersByType);
    let cantidad = [];
    let labels = [];

    for (let i = 0; i < totalByTypes.length; i++) {
        labels.push(totalByTypes[i][0]);
        cantidad.push(totalByTypes[i][1]);
    }
    const options = {
        fill: true,
        scales: {
            y: {
                min: 0,
            },
        },
        resposive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const data = {
        datasets: [
            {
                label: 'usuarios',
                tension: '0.3',
                data: cantidad,
                borderColor: '#0575E6',
                backgroundColor: '#0576e63c',
                borderWidth: 1,
            },
        ],
        labels,
    }
    return (
        <div >
            <Bar data={data} options={options} />
        </div>
    )
}
