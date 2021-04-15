import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Stats = () => {
  const [crimeData, setCrimeData] = useState();

  const getCrimeData = async () => {
    try {
      axios
        .get(
          "https://raw.githubusercontent.com/ChrisNJ/ResidenTT/main/Predictions.txt"
        )
        .then((res) => {
          setCrimeData(res);
        })
        .catch((err) => {});
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCrimeData();
  }, []);

  return (
    <div>
      <h1 className="mb-2 mt-2 text-center">Crime Statistics</h1>
      <p style={{ textAlign: "center", color: "lightslategray" }}>
        <small>
          <i>
            <b>
              *All 2021 crime rates are predictions, as such they are not
              factual.
            </b>
          </i>
        </small>
      </p>
      <div className="row justify-content-md-center mt-3">
        {crimeData ? (
          <div className="col col-lg-8">
            <Line
              data={{
                datasets: [
                  {
                    label: "Total",
                    data: crimeData.data.Overall.Total.data,
                    backgroundColor: ["rgba(62, 62, 202, 0.5)"],
                    borderColor: ["rgba(62, 62, 202, 0.9)"],
                    pointBackgroundColor: "rgba(62, 62, 202, 1)",
                    pointBorderColor: "rgba(62, 62, 202, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Breaking Offences",
                    data: crimeData.data.Overall.BREAKING_OFFENCES.data,
                    backgroundColor: ["rgba(202, 132, 62, 0.5)"],
                    borderColor: ["rgba(202, 132, 62, 0.9)"],
                    pointBackgroundColor: "rgba(202, 132, 62, 1)",
                    pointBorderColor: "rgba(202, 132, 62, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Fraud Offences",
                    data: crimeData.data.Overall.FRAUD_OFFENCES.data,
                    backgroundColor: ["rgba(202, 62, 202, 0.5)"],
                    borderColor: ["rgba(202, 62, 202, 0.9)"],
                    pointBackgroundColor: "rgba(202, 62, 202, 1)",
                    pointBorderColor: "rgba(202, 62, 202, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "General Larceny",
                    data: crimeData.data.Overall.GENERAL_LARCENY.data,
                    backgroundColor: ["rgba(62, 202, 62, 0.5)"],
                    borderColor: ["rgba(62, 202, 62, 0.9)"],
                    pointBackgroundColor: "rgba(62, 202, 62, 1)",
                    pointBorderColor: "rgba(62, 202, 62, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Robbery",
                    data: crimeData.data.Overall.ROBBERY.data,
                    backgroundColor: ["rgba(114, 30, 198, 0.5)"],
                    borderColor: ["rgba(114, 30, 198, 0.9)"],
                    pointBackgroundColor: "rgba(114, 30, 198, 1)",
                    pointBorderColor: "rgba(114, 30, 198, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Kidnapping",
                    hidden: true,
                    data: crimeData.data.Overall.KIDNAPPING.data,
                    backgroundColor: ["rgba(202, 202, 62, 0.5)"],
                    borderColor: ["rgba(202, 202, 62, 0.9)"],
                    pointBackgroundColor: "rgba(202, 202, 62, 1)",
                    pointBorderColor: "rgba(202, 202, 62, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Larceny Dwelling House",
                    hidden: true,
                    data: crimeData.data.Overall.LARCENY_DWELLING_HOUSE.data,
                    backgroundColor: ["rgba(141, 141, 124, 0.5)"],
                    borderColor: ["rgba(141, 141, 124, 0.9)"],
                    pointBackgroundColor: "rgba(141, 141, 124, 1)",
                    pointBorderColor: "rgba(141, 141, 124, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Larceny Motor Vehicle",
                    hidden: true,
                    data: crimeData.data.Overall.LARCENY_MOTOR_VEHICLE.data,
                    backgroundColor: ["rgba(191, 63, 63, 0.7)"],
                    borderColor: ["rgba(191, 63, 63, 0.9)"],
                    pointBackgroundColor: "rgba(191, 63, 63, 1)",
                    pointBorderColor: "rgba(191, 63, 63, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Poss of F/Arm & Ammo",
                    hidden: true,
                    data: crimeData.data.Overall.POSS_OF_FIREARM_AND_AMMO.data,
                    backgroundColor: ["rgba(238, 130, 238, 0.5)"],
                    borderColor: ["rgba(238, 130, 238, 0.9)"],
                    pointBackgroundColor: "rgba(238, 130, 238, 1)",
                    pointBorderColor: "rgba(238, 130, 238, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Poss of Narcotics for Trafficking",
                    hidden: true,
                    data:
                      crimeData.data.Overall.POSS_OF_NARCOTICS_FOR_TRAFFICKING
                        .data,
                    backgroundColor: ["rgba(255, 165, 0, 0.5)"],
                    borderColor: ["rgba(255, 165, 0, 0.9)"],
                    pointBackgroundColor: "rgba(255, 165, 0, 1)",
                    pointBorderColor: "rgba(255, 165, 0, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Serious Indecency",
                    hidden: true,
                    data: crimeData.data.Overall.SERIOUS_INDECENCY.data,
                    backgroundColor: ["rgba(191, 127, 63, 0.5)"],
                    borderColor: ["rgba(191, 127, 63, 0.9)"],
                    pointBackgroundColor: "rgba(191, 127, 63, 1)",
                    pointBorderColor: "rgba(191, 127, 63, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Sexual Offence",
                    hidden: true,
                    data: crimeData.data.Overall.SEXUAL_OFFENCE.data,
                    backgroundColor: ["rgba(62, 202, 202, 0.5)"],
                    borderColor: ["rgba(62, 202, 202, 0.9)"],
                    pointBackgroundColor: "rgba(62, 202, 202, 1)",
                    pointBorderColor: "rgba(62, 202, 202, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Wounding/Shooting",
                    hidden: true,
                    data: crimeData.data.Overall.WOUNDING_SHOOTING.data,
                    backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                    borderColor: ["rgba(255, 99, 132, 0.9)"],
                    pointBackgroundColor: "rgba(255, 99, 132, 1)",
                    pointBorderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                  {
                    label: "Other Serious Crimes",
                    hidden: true,
                    data: crimeData.data.Overall.OTHER_SERIOUS_CRIMES.data,
                    backgroundColor: ["rgba(191, 63, 127, 0.5)"],
                    borderColor: ["rgba(191, 63, 127, 0.9)"],
                    pointBackgroundColor: "rgba(191, 63, 127, 1)",
                    pointBorderColor: "rgba(191, 63, 127, 1)",
                    borderWidth: 2,
                    fill: false,
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
                      ticks: {
                        fontColor: "lightgray",
                        fontSize: 12,
                      },
                      gridLines: {
                        color: "rgba(213, 221, 223, 0.3)",
                      },
                      type: "time",
                      time: {
                        unit: "year",
                        unitStepSize: 1,
                        displayFormats: {
                          year: "YYYY",
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        ) : (
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Stats;
