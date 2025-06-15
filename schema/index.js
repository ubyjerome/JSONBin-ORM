const {
    supportedSchemaType
} = require("./type")

const globalSchema = {}

const validateValueAgainstSchema = (value, schemaType) => {
    if (schemaType === "object") {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error(`Expected an object but received ${typeof value}`);
        }
    } else if (schemaType === "array") {
        if (!Array.isArray(value)) {
            throw new Error(`Expected an array but received ${typeof value}`);
        }
    } else if (typeof value !== schemaType) {
        throw new Error(`Expected ${schemaType} but received ${typeof value}`);
    }
};

const validateNestedSchema = (value, schema) => {
    if (typeof schema === "object" && !Array.isArray(schema)) {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error("Expected an object for nested schema validation.");
        }
        for (const key in schema) {
            if (!value.hasOwnProperty(key)) {
                throw new Error(`Missing key "${key}" in nested object.`);
            }
            validateValueAgainstSchema(value[key], schema[key]);
        }
    } else if (Array.isArray(schema)) {
        if (!Array.isArray(value)) {
            throw new Error("Expected an array for nested schema validation.");
        }
        for (const item of value) {
            validateValueAgainstSchema(item, schema[0]); // Assume uniform type for array items
        }
    } else {
        validateValueAgainstSchema(value, schema);
    }
};


const addNewSchema = (object, id) => {
    if (typeof object !== "object" || object === null || Array.isArray(object)) {
        throw new Error("Schema must be a valid object.");
    }

    if (typeof id !== "string") {
        throw new Error("Schema ID must be a string.");
    }

    // Ensure the schema contains at least one key
    if (Object.keys(object).length === 0) {
        throw new Error("Schema must contain at least one key.");
    }

    // Check if all types in the schema are supported
    const unsupportedTypes = Object.values(object).filter(type => !supportedSchemaType.includes(type));
    if (unsupportedTypes.length > 0) {
        throw new Error(`Schema contains unsupported types: ${unsupportedTypes.join(", ")}. Supported types are: ${supportedSchemaType.join(", ")}`);
    }

    const validateSchemaStructure = (schema) => {

        for (const key in schema) {
            const type = schema[key];
            if (typeof type === "object" && !Array.isArray(type)) {
                validateSchemaStructure(type);
            } else if (Array.isArray(type)) {
                if (type.length !== 1 || !supportedSchemaType.includes(type[0])) {
                    throw new Error(`Invalid array schema definition for key "${key}".`);
                }
            } else if (!supportedSchemaType.includes(type)) {
                throw new Error(`Unsupported type "${type}" for key "${key}".`);
            }
        }
    };
    validateSchemaStructure(object);

    globalSchema[id] = object
    return true
}

const validateSchema = (object, id) => {
    if (typeof object !== "object" || object === null || Array.isArray(object)) {
        throw new Error("Schema must be a valid object.");
    }
    const binSchemaFetched = globalSchema[id];
    if (!binSchemaFetched) {
        throw new Error("Schema For This Bin Has Not Been Defined")
    }

    const suppliedKeys = Object.keys(object);
    const suppliedKeyValues = Object.values(object)
    const schemaKeyTypes = Object.values(binSchemaFetched)
    const matchKeys = Object.keys(binSchemaFetched);
    const absentKeys = matchKeys.filter(key => !suppliedKeys.includes(key));

    if (absentKeys.length > 0) {
        throw new Error(`Object Keys are Incomplete. Missing: ${absentKeys.join(", ")}`);
    }

    for (const key of suppliedKeys) {
        if (!binSchemaFetched.hasOwnProperty(key)) {
            throw new Error(`Unexpected key "${key}" found in the supplied object.`);
        }
    }

    const validateObjectAgainstSchema = (obj, schema) => {
        for (const key in schema) {
            if (!obj.hasOwnProperty(key)) {
                throw new Error(`Missing key "${key}" in object.`);
            }
            validateNestedSchema(obj[key], schema[key]);
        }
    };
    validateObjectAgainstSchema(object, binSchemaFetched);

    for (let i = 0; i < suppliedKeyValues.length; i++) {
        if (typeof suppliedKeyValues[i] !== schemaKeyTypes[i]) {
            throw new Error(`Value type mismatch for key "${matchKeys[i]}". Expected ${schemaKeyTypes[i]} but received ${typeof suppliedKeyValues[i]}`);
        }
    }

    return {
        status: true,
        message: "Object matches the schema"
    };
}

const checkKeyInSchema = (key, id) => {
    const schema = globalSchema[id];
    if (!schema) {
        throw new Error(`Schema with ID "${id}" does not exist.`);
    }

    if (!schema.hasOwnProperty(key)) {
        throw new Error(`Key "${key}" does not belong to the schema with ID "${id}".`);
    }

    return true;
};

module.exports = {
    globalSchema,
    addNewSchema,
    validateSchema,
    checkKeyInSchema
}