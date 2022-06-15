import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
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
//random Colors 
var internalDataLength = cantidad.length;

var bkColors = [];
var hoverColor = [];

var i = 0;
while (i <= internalDataLength) {
    var randomR = Math.floor((Math.random() * 200)+90);
    var randomG = Math.floor((Math.random() * 230)+90);
    var randomB = Math.floor((Math.random() * 205)+90);
  
    var graphBackground = "rgb(" 
            + randomR + ", " 
            + randomG + ", " 
            + randomB + ")";
    bkColors.push(graphBackground);
    var hoverColors = "rgb(" 
            + (randomR + 25) + ", " 
            + (randomG + 25) + ", " 
            + (randomB + 25) + ")";
    hoverColor.push(hoverColors);
    
  i++;
};


  const data = {
    datasets: [
      {
        label: "ciudades",
        data: cantidad,
        tension: "0.3",
        backgroundColor: bkColors,
        hoverBackgroundColor: hoverColor,
        borderColor:'white',
        borderWidth: 3,
      },
    ],
    labels,
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}
