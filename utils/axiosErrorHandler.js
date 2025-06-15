function handleError(error) {
    if (error?.response?.data?.message) {
        return error.response.data.message;
    } else if (error?.message) {
        return error.message;
    } else {
        return "An Unknown Error Occurred";
    }
}

module.exports = {
    handleError
}