const {
  processUploadedFile,
  storeDataInDb,
} = require("../services/heartRateService");
const commonFun = require("../utils/common");
const clinicalDataController = {};

clinicalDataController.processClinicalData = async (req, res) => {
  try {
    const file = req.file;
    
    // Process HEART_RATE data
    const processedData = await processUploadedFile(file);

    // Save processed heart rate data to the database
    await storeDataInDb(processedData);

    return commonFun.successResponse(
      res,
      processedData,
      "Data retrieved successfully",
      200
    );
  } catch (error) {
    return commonFun.failureResponse(res, error, 400);
  }
};

module.exports = clinicalDataController;
