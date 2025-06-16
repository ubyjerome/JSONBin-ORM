const {
    addNewSchema
} = require("./schema");
const {
    validateBinConfigs
} = require("./types/binConfiguration");
const {
    fetchData
} = require("./modules/fetchData");
const {
    addNewData
} = require("./modules/addData");


class bin {
    constructor(configs) {
        try {
            validateBinConfigs(configs)
            this.configs = {}
            this.binId = configs.binId
            this.configs.headers = {
                'X-Master-Key': configs.apiKey
            }
            addNewSchema(configs.schema, configs.binId)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async fetchAll() {
        try {
            return await fetchData(
                this.configs.headers,
                this.binId,
                "ALL"
            )
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async createNew(data) {
        try {
            return await addNewData(
                this.configs.headers,
                data,
                this.binId,
                "ALL"
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async fetchById(id) {
        try {
            return await fetchData(
                this.configs.headers,
                this.binId,
                "ONE",
                id
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateOneById(id, data) {
        try {
            return await addNewData(
                this.configs.headers,
                data,
                this.binId,
                "ONE",
                id
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    
    async deleteById(id) {
        try {
            return await deleteData(
                this.configs.headers,
                this.binId,
                id
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async find(query) {
        try {
            return await fetchData(
                this.configs.headers,
                this.binId,
                "QUERY",
                null,
                query
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateMany(query, data) {
        try {
            return await addNewData(
                this.configs.headers,
                data,
                this.binId,
                "MANY",
                null,
                query
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = {
    bin
}