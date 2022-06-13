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
  //Ciudades
  let ciudadesJson = async function () {
    const url = "http://localhost:3001/users/ciudades";
    let respuesta = await fetch(url);
    let response = await respuesta.json();
    return response;
  };

  //Usuarios
  let usuariosJson = async function () {
    const url = "http://localhost:3001/users";
    let respuesta = await fetch(url);
    let response2 = await respuesta.json();
    return response2;
  };

  // !!!Acceder a la propiedad USUARIOS => PUBLICACIONES[0] => DIRECCION => CIUDAD
  //siii jaj
  //Array de usuarios y ciudades
  let usuarios = usuariosJson().then((val) => console.log(val));
  let ciudades = ciudadesJson().then((val) => console.log(val));

  const data = {
    datasets: [
      {
        label: "ciudades",
        data: ciudades,
        tension: "0.3",
        borderColor: "#0575E6",
        backgroundColor: "#0576e63c",
        borderWidth: 1,
      },
    ],
    usuarios,
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
