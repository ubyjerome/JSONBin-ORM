const {
    JsonBinAPI
} = require("../api");

async function deleteData(headers, binId, id) {
    if (!id || typeof id !== "string") {
        throw new Error("Invalid Object id Supplied");
    }
    let rawData = await JsonBinAPI.fetch(`/v3/b/${binId}/latest`, headers);
    const record = rawData.record;
    const updatedRecords = record.filter(item => item._id !== id);
    if (updatedRecords.length === record.length) {
        throw new Error("No record found with the specified id");
    }
    await JsonBinAPI.put(`/v3/b/${binId}`, updatedRecords, headers);
    return true;
}

module.exports = {
    deleteData
}