const {
    default: axios
} = require("axios");
const { handleError } = require("../utils/axiosErrorHandler");

let baseurl = `https://api.jsonbin.io`;


const axiosInstance = axios.create({
    baseURL: baseurl,
    // timeout: 5000,
});


class JsonBinAPI {

    async fetch(endpoint, headers) {
        try {
            const response = await axiosInstance.get(endpoint, {
                headers: headers,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error))
        }
    }

    async put(endpoint, data, headers) {
        try {
            const response = await axiosInstance.put(endpoint, data, {
                headers: headers,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error))
        }
    }

    async patch(endpoint, data, headers) {
        try {
            const response = await axiosInstance.patch(endpoint, data, {
                headers: headers,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error))
        }
    }
}

module.exports = {
    JsonBinAPI: new JsonBinAPI()
};