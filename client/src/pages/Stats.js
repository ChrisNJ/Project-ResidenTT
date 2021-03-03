import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Stats = () => {
  const [crimeData, setCrimeData] = useState([]);

  const getCrimeData = async () => {
    try {
      let range = 2020;
      const body = { range };

      const res = await fetch("/crimereports/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseData = await res.json();
      console.log(parseData);
      setCrimeData(parseData);
    } catch (err) {
      console.error(err.message); 
    }
  };

  useEffect(() => {
    getCrimeData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Stats</h1>
      <div className="row justify-content-md-center">
        <div className="col col-lg-8">
          <Bar
            data={{
              labels: [
                "Total Crimes",
                "WOUNDING/SHOOTING",
                "ROBBERY",
                "POSS OF NARCOTICS FOR TRAFFICKING",
                "FRAUD OFFENCES",
                "GENERAL LARCENY",
                "LARCENY MOTOR VEHICLE",
                "LARCENY DWELLING HOUSE",
                "BREAKING OFFENCES",
                "OTHER SERIOUS CRIMES",
              ],
              datasets: [
                {
                  label: "# of crimes",
                  data: crimeData,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(125, 192, 192, 0.5)",
                    "rgba(33, 102, 255, 0.5)",
                    "rgba(85, 159, 64, 0.5)",
                    "rgba(255, 200, 94, 0.5)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 0.9)",
                    "rgba(54, 162, 235, 0.9)",
                    "rgba(255, 206, 86, 0.9)",
                    "rgba(75, 192, 192, 0.9)",
                    "rgba(153, 102, 255, 0.9)",
                    "rgba(255, 159, 64, 0.9)",
                    "rgba(125, 192, 192, 0.9)",
                    "rgba(33, 102, 255, 0.9)",
                    "rgba(85, 159, 64, 0.9)",
                    "rgba(255, 200, 94, 0.9)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={500}
            width={700}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    gridLines: {
                      color: "rgba(213, 221, 223, 0.3)",
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      color: "rgba(213, 221, 223, 0.3)",
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Stats;
