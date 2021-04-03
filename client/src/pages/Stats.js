import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

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
      <br />
      <h1 style={{ textAlign: "center" }}>
        Trinidad and Tobago Crime Statistics
      </h1>
      <br />
      <div className="row justify-content-md-center">
        <div className="col col-lg-8">
          <Line
            data={{
              datasets: [
                {
                  label: "Robbery",
                  data: [
                    { x: "2015-01-01", y: 217 },
                    { x: "2015-02-01", y: 219 },
                    { x: "2015-03-01", y: 244 },
                    { x: "2015-04-01", y: 198 },
                    { x: "2015-05-01", y: 215 },
                    { x: "2015-06-01", y: 184 },
                    { x: "2015-07-01", y: 211 },
                    { x: "2015-08-01", y: 212 },
                    { x: "2015-09-01", y: 201 },
                    { x: "2015-10-01", y: 206 },
                    { x: "2015-11-01", y: 170 },
                    { x: "2015-12-01", y: 233 },
                    { x: "2016-01-01", y: 259 },
                    { x: "2016-02-01", y: 236 },
                    { x: "2016-03-01", y: 230 },
                    { x: "2016-04-01", y: 226 },
                    { x: "2016-05-01", y: 207 },
                    { x: "2016-06-01", y: 199 },
                    { x: "2016-07-01", y: 222 },
                    { x: "2016-08-01", y: 189 },
                    { x: "2016-09-01", y: 210 },
                    { x: "2016-10-01", y: 223 },
                    { x: "2016-11-01", y: 213 },
                    { x: "2016-12-01", y: 265 },
                    { x: "2017-01-01", y: 238 },
                    { x: "2017-02-01", y: 231 },
                    { x: "2017-03-01", y: 206 },
                    { x: "2017-04-01", y: 230 },
                    { x: "2017-05-01", y: 222 },
                    { x: "2017-06-01", y: 218 },
                    { x: "2017-07-01", y: 281 },
                    { x: "2017-08-01", y: 274 },
                    { x: "2017-09-01", y: 262 },
                    { x: "2017-10-01", y: 266 },
                    { x: "2017-11-01", y: 258 },
                    { x: "2017-12-01", y: 299 },
                    { x: "2018-01-01", y: 198 },
                    { x: "2018-02-01", y: 305 },
                    { x: "2018-03-01", y: 280 },
                    { x: "2018-04-01", y: 287 },
                    { x: "2018-05-01", y: 253 },
                    { x: "2018-06-01", y: 232 },
                    { x: "2018-07-01", y: 303 },
                    { x: "2018-08-01", y: 308 },
                    { x: "2018-09-01", y: 268 },
                    { x: "2018-10-01", y: 294 },
                    { x: "2018-11-01", y: 310 },
                    { x: "2018-12-01", y: 239 },
                    { x: "2019-01-01", y: 259 },
                    { x: "2019-02-01", y: 198 },
                    { x: "2019-03-01", y: 262 },
                    { x: "2019-04-01", y: 254 },
                    { x: "2019-05-01", y: 253 },
                    { x: "2019-06-01", y: 239 },
                    { x: "2019-07-01", y: 238 },
                    { x: "2019-08-01", y: 274 },
                    { x: "2019-09-01", y: 254 },
                    { x: "2019-10-01", y: 314 },
                    { x: "2019-11-01", y: 242 },
                    { x: "2019-12-01", y: 258 },
                    { x: "2020-01-01", y: 235 },
                    { x: "2020-02-01", y: 218 },
                    { x: "2020-03-01", y: 232 },
                    { x: "2020-04-01", y: 111 },
                    { x: "2020-05-01", y: 122 },
                    { x: "2020-06-01", y: 147 },
                    { x: "2020-07-01", y: 148 },
                    { x: "2020-08-01", y: 164 },
                    { x: "2020-09-01", y: 181 },
                    { x: "2020-10-01", y: 195 },
                    { x: "2020-11-01", y: 180 },
                    { x: "2020-12-01", y: 151 },
                    { x: "2021-01-01", y: 165 },
                    { x: "2021-02-01", y: 201 },
                    { x: "2021-03-01", y: 187 },
                    { x: "2021-04-01", y: 156 },
                    { x: "2021-05-01", y: 148 },
                    { x: "2021-06-01", y: 142 },
                    { x: "2021-07-01", y: 169 },
                    { x: "2021-08-01", y: 164 },
                    { x: "2021-09-01", y: 160 },
                    { x: "2021-10-01", y: 174 },
                    { x: "2021-11-01", y: 155 },
                    { x: "2021-12-01", y: 163 },
                  ],

                  backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                  borderColor: ["rgba(255, 99, 132, 0.9)"],
                  pointBackgroundColor: "#FC2525",
                  pointBorderColor: "#FC2525",
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
