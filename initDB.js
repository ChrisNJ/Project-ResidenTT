// initializes database with json files
// populates the respective tables with data

const db = require("./db");

// import models to create table records
const CrimeReport = require("./models/CrimeReport");

// import xlsx to read the excel file and convert the columns to json format
const XLSX = require("xlsx");
const workbook = XLSX.readFile("crimereports.xlsx");
const sheet_name_list = workbook.SheetNames;
crimereports = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// reads the json object and creates records in the CrimeReport table
var uploadFile = function () {
  try {
    for (var i = 0; i < crimereports.length; i++) {
      CrimeReport.create({
        date: crimereports[i].date,
        time: crimereports[i].time,
        station: crimereports[i].station,
        division: crimereports[i].division,
        location: crimereports[i].location,
        latitude: crimereports[i].latitude,
        longitude: crimereports[i].longitude,
        offences: crimereports[i].offences,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

uploadFile();
