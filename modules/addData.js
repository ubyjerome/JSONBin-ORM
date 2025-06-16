const {
    randomUUID
} = require('crypto');

const {
    JsonBinAPI
} = require("../api");
const {
    validateSchema,
    checkKeyInSchema
} = require("../schema");

async function addNewData(headers, data, binId, opFor, id, condition) {
    validateSchema(data, binId)
    let rawData = await JsonBinAPI.fetch(`/v3/b/${binId}/latest`, headers)
    if (opFor === 'ONE') {
        if (!id || typeof (id) != "string") {
            throw new Error("Invalid Object id Supplied");
        }
        const record = rawData.record;
        let documentFoundIndex;
        documentFound = record.find((item, index) => {
            if (item._id === id) {
                documentFoundIndex = index;
                return true;
            }
            return false;
        });
        if (!documentFound) {
            throw new Error("No record found with the specified id");
        }
        for (const key of Object.keys(documentFound)) {
            if (Object.keys(data).includes(key)) {
                documentFound[key] = data[key]
            }
        }

        for (const key of Object.keys(data)) {
            if (checkKeyInSchema(key, binId)) {
                documentFound[key] = data[key]
            }
        }
        record[documentFoundIndex] = documentFound
        console.log(record)
        return [];
    }

    if (opFor === 'ALL') {
        if (!(data._id)) {
            data._id = randomUUID();
        }
        let record = rawData.record;
        if (!Array.isArray(record)) {
            record = [record];
        }
        record.push(data);
        rawData.record = record;

        await JsonBinAPI.put(`/v3/b/${binId}`, record, headers);
        return [];
    }

    if (opFor === 'MANY') {
        if (!condition || typeof condition !== "object") {
            throw new Error("Invalid query condition supplied");
        }
        const record = rawData.record;
        const updatedRecords = record.map(item => {
            if (Object.keys(condition).every(key => item[key] === condition[key])) {
                for (const key of Object.keys(data)) {
                    if (checkKeyInSchema(key, binId)) {
                        item[key] = data[key];
                    }
                }
            }
            return item;
        });
        await JsonBinAPI.put(`/v3/b/${binId}`, updatedRecords, headers);
        return updatedRecords;
    }

    return rawData;
}

module.exports = {
    addNewData
}