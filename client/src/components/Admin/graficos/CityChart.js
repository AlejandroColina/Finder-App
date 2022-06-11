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
import axios from "axios";

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
  // const ciudades = axios
  //   .get("http://localhost:3001/users/ciudades")
  //   .then((res) => {
  //     return res.data;
  //   });

  let cantidad = [];

  const ciudades = useSelector((state) => state.ciudades);
  console.log(ciudades);

  for (let i = 0; i < ciudades; i++) {
    cantidad.push(ciudades[i][1]);
  }

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
    cantidad,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    fill: true,
    scales: {
      y: {
        min: 0,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
