import React, { useEffect, useState } from "react";

const Map = () => {
  const [crimeData, setCrimeData] = useState([]);

  //Get crime data stored in the database

  async function getCrimeData() {
    try {
      const res = await fetch("/crimereports/", {
        method: "GET",
      });
      console.log(res);
      const parseData = await res.json();
      console.log(parseData);
      setCrimeData(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getCrimeData();
  }, []);

  return (
    <div className="container">
      <h2>Map</h2>
      {crimeData.map((crime) => {
        return (
          <div key={crime.id}>
            {crime.date +
              " , " +
              crime.time +
              " ," +
              crime.station +
              ", " +
              crime.division}
          </div>
        );
      })}
    </div>
  );
};

export default Map;
