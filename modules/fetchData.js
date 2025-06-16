const {
    JsonBinAPI
} = require("../api");

async function fetchData(headers, binId, opFor, id, condition) {
    let rawData = await JsonBinAPI.fetch(`/v3/b/${binId}/latest`, headers);
    let allData;

    if (opFor === 'ONE') {
        if (!id || typeof (id) != "string") {
            throw new Error("Invalid Object id Supplied");
        }
        allData = (rawData.record.find(item => item._id === id) || null);
        return allData;
    }

    if (opFor === 'ALL') {
        allData = rawData.record;
        return allData;
    }

    if (opFor === 'QUERY') {
        if (!condition || typeof condition !== "object") {
            throw new Error("Invalid query condition supplied");
        }
        allData = rawData.record.filter(item => {
            return Object.keys(condition).every(key => item[key] === condition[key]);
        });
        return allData;
    }

    allData = rawData.record;
    return allData;
}

module.exports = {
    fetchData
}