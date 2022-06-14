import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CityChart() {
  const usersByCity = useSelector((state) => state.usersByCity);
  let cantidad = [];
  let labels = [];

  // const ciudadesTotal = useSelector((state) => state.ciudades);

  for (let i = 0; i < usersByCity.length; i++) {
    labels.push(usersByCity[i][0]);
    cantidad.push(usersByCity[i][1]);
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
        label: "ciudades",
        data: cantidad,
        tension: "0.3",
        borderColor: "#0575E6",
        backgroundColor: "#0576e63c",
        borderWidth: 1,
      },
    ],
    labels,
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
