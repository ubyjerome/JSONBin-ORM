const validateBinConfigs = (configs) => {
    if (typeof configs !== 'object' || configs === null || Array.isArray(configs)) {
        throw new Error('New Bin Configuration must be a non-null object');
    }
    const requiredKeys = ['binId', 'apiKey', 'schema'];
    const configKeys = Object.keys(configs);

    // Check for missing keys
    const missingKeys = requiredKeys.filter(key => !configKeys.includes(key));
    if (missingKeys.length > 0) {
        throw new Error(`New Bin Configuration Missing required keys: ${missingKeys.join(', ')}`);
    }

    // Check for additional keys
    const additionalKeys = configKeys.filter(key => !requiredKeys.includes(key));
    if (additionalKeys.length > 0) {
        throw new Error(` New Bin Configuration Incudes Additional Keys: ${additionalKeys.join(', ')}`);
    }

    // If all checks pass, return true
    return true;
};

module.exports = { validateBinConfigs };