const fs = require("fs");
const path = require("path");
const HeartRate = require("../models/heartRateModel");

//Read The file
const processUploadedFile = async (file) => {
  try{
    const filePath = path.join(file.path);
    const fileData = fs.readFileSync(filePath, "utf8");
    const { clinical_data } = JSON.parse(fileData);
  
    const { HEART_RATE, ...otherMetrics } = clinical_data;
  
    // Aggregate heart rate data
    const heartRateData = HEART_RATE.data;
    const aggregatedData = aggregateHeartRateData(heartRateData);
  
    console.log("------------data is processed successfully")
    // Clean up the uploaded file
    fs.unlinkSync(filePath);
  
    return aggregatedData;  
  }catch(error){
    console.error("Error in processUpload file:", error);
    throw error; 
  }
};

// Aggregate the data after reading file
const aggregateHeartRateData = (data) => {
  const result = [];
  let currentMeasurements = [];

  const parseDate = (date) => new Date(date);
  const roundToMinute = (date) =>
    new Date(Math.floor(date.getTime() / 60000) * 60000);

  let [currentIntervalStart, currentIntervalEnd] = [
    roundToMinute(parseDate(data[0].on_date)),
    new Date(roundToMinute(parseDate(data[0].on_date)).getTime() + 15 * 60000),
  ];

  data.forEach(({ on_date, measurement }) => {
    const entryDate = parseDate(on_date);

    if (entryDate >= currentIntervalEnd) {
      result.push({
        from_date: currentIntervalStart.toISOString(),
        to_date: currentIntervalEnd.toISOString(),
        measurement: {
          low: Math.min(...currentMeasurements),
          high: Math.max(...currentMeasurements),
        },
      });

      currentIntervalStart = roundToMinute(entryDate);
      currentIntervalEnd = new Date(
        currentIntervalStart.getTime() + 15 * 60000
      );
      currentMeasurements = [];
    }

    currentMeasurements.push(parseInt(measurement));
  });

  if (currentMeasurements.length) {
    result.push({
      from_date: currentIntervalStart.toISOString(),
      to_date: currentIntervalEnd.toISOString(),
      measurement: {
        low: Math.min(...currentMeasurements),
        high: Math.max(...currentMeasurements),
      },
    });
  }

  return result;
};

//Store data in data base
const storeDataInDb = async (data) => {
  try {
    const bulkData = data.map((item) => ({
      from_date: item.from_date,
      to_date: item.to_date,
      low: item.measurement.low,
      high: item.measurement.high,
    }));

    await HeartRate.bulkCreate(bulkData);
    console.log("-----------data is inserted successfully----------");
  } catch (error) {
    console.error("Error storing data in database:", error);
    throw error; 
  }
};

module.exports = {
  processUploadedFile,
  storeDataInDb,
};
